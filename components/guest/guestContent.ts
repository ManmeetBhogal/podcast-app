/* ──────────────────────── /be-a-guest PAGE COPY ──────────────────────── */

export type PerspectiveId = "researcher" | "lived" | "community";

export interface PerspectiveItem {
  id: PerspectiveId;
  label: string;
  summary: string;
  topics: string[];
  uploadNote: string;
}

export const GUEST_COPY = {
  headline: "The brain is better understood together",
  lead: "brainSTEM brings scientists, clinicians, and people with lived experience together to make brain science accessible and help destigmatize mental health.",
  ctaLabel: "Open Guest Interest Form",
  ctaMeta: "6 short questions · ~3 min · No academic background required",
  disclaimer:
    "Because we're a small team, submitting doesn't guarantee an episode. We read every response and follow up by email if there's a fit.",
};

export const PERSPECTIVES: PerspectiveItem[] = [
  {
    id: "researcher",
    label: "Research & Clinical",
    summary:
      "Make brain and mental health research clear and useful for everyday listeners, whether you're a PI, clinician, postdoc, or grad student.",
    topics: [
      "Translating a recent study",
      "Clearing up mental health myths",
      "Explaining how treatments work",
    ],
    uploadNote: "Optional upload: share a CV, paper, or past talk!",
  },
  {
    id: "lived",
    label: "Lived Experience",
    summary:
      "Personal stories are the heart of brainSTEM. Sharing your journey helps listeners feel less alone and bridges research with real life.",
    topics: [
      "Living with a mental health or brain condition",
      "Diagnosis, care & recovery",
      "What you wish others understood",
    ],
    uploadNote: "Optional upload: share anything that helps tell your story!",
  },
  {
    id: "community",
    label: "Educators & Advocates",
    summary:
      "Teachers, organizers, policy voices, and communicators working at the intersection of brain health, equity, and public awareness.",
    topics: [
      "Community mental health outreach",
      "Health equity & science policy",
      "Creative neuroscience education",
    ],
    uploadNote: "Optional upload: share a short bio, flyer, or link!",
  },
];

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Fill out the form",
    body: "Share your topic or perspective in 6 short questions.",
  },
  {
    num: "02",
    title: "Team review",
    body: "Dr. Hilary Marusak and our producers review every response together.",
  },
  {
    num: "03",
    title: "Follow-up & prep",
    body: "If it's a fit, we'll email you with next steps and schedule an interview.",
  },
];

export const GUEST_QA = [
  {
    q: "Do I need to be in Detroit or affiliated with Wayne State?",
    a: "No. We record remotely with guests from anywhere, and occasionally in person when schedules align.",
  },
  {
    q: "Do I need podcast experience or an academic background?",
    a: "Not at all. Episodes are relaxed conversations, and we send details and interview questions ahead of time so you feel comfortable.",
  },
  {
    q: "How is my information handled?",
    a: "Submissions are collected through Wayne State University's Qualtrics platform and reviewed by the brainSTEM team. We won't share them publicly without your consent.",
  },
  {
    q: "Do I have to upload a file?",
    a: "No, the file upload is completely optional. Attach a CV, paper, or image if helpful, or leave it blank.",
  },
];
