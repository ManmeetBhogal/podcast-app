import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { PODCAST_FEED_TAG } from '@/app/lib/podcast';

// Constant-time string comparison to avoid leaking secret bytes via timing differences
function secretsMatch(provided: string, expected: string): boolean {
  const providedBuf = Buffer.from(provided);
  const expectedBuf = Buffer.from(expected);

  if (providedBuf.length !== expectedBuf.length) {
    return false;
  }

  return timingSafeEqual(providedBuf, expectedBuf);
}

// POST /api/revalidate
// On-demand cache bust for the podcast RSS feed.
// Protected by the REVALIDATE_SECRET environment variable sent in the
// `x-revalidate-secret` header so only authorized triggers can clear the cache.
export async function POST(request: NextRequest) {
  const expectedSecret = process.env.REVALIDATE_SECRET;

  // Fail closed if the server forgot to configure REVALIDATE_SECRET
  if (!expectedSecret) {
    console.error('REVALIDATE_SECRET is not configured');
    return NextResponse.json(
      { error: 'Revalidation secret is not configured on the server' },
      { status: 500 }
    );
  }

  const providedSecret = request.headers.get('x-revalidate-secret') ?? '';

  if (!providedSecret || !secretsMatch(providedSecret, expectedSecret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Marks every Next.js fetch() tagged with PODCAST_FEED_TAG as stale immediately,
  // so the next visit fetches fresh episodes without waiting for the 15-min timer.
  revalidateTag(PODCAST_FEED_TAG);

  return NextResponse.json({
    revalidated: true,
    tag: PODCAST_FEED_TAG,
    timestamp: new Date().toISOString(),
  });
}