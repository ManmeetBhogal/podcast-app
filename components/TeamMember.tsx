import Image from "next/image";
import { motion } from "framer-motion";

// Define team member properties
interface TeamMemberProps {
  name: string;
  role: string;
  photoUrl: string;
  description: string | string[];
  isAlternate?: boolean;
}

// Data for team members
const teamData: TeamMemberProps[] = [
  {
    name: "Dr. Hilary Marusak",
    role: "Host",
    photoUrl: "/team/hilary.jpg",
    description: [
      `Dr. Hilary Marusak is a developmental neuroscientist and tenured Associate Professor of Psychiatry and Behavioral Neurosciences at Wayne State University School of Medicine. She directs the Division of Cannabinoids in Neurodevelopment (CANDID) and the THINK Lab, which use neuroimaging and behavioral approaches to study the effects of cannabis, stress, and the endocannabinoid system on brain development and mental health in youth.`,
      `Dr. Marusak is a PI or MPI on studies funded by the National Institutes of Health, One Mind, and the State of Michigan. She is an Associate Member of the American College of Neuropsychopharmacology (ACNP) and serves as a Non-Voting Associate Member of the ACNP Council. She also holds national leadership and editorial roles, co-founded Science Policy Network–Detroit, and hosts the BrainSTEM podcast to share evidence-based brain science with the public.`,
    ],
  },
  {
    name: "Manmeet Bhogal",
    role: "Co-Producer",
    photoUrl: "/team/Manmeet.jpg",
    description: `Manmeet is a Co-Producer and the audio engineer for the brainSTEM podcast. He is passionate about science communication through storytelling. Manmeet has a background in computer science with an undergraduate degree from Wayne State University.`,
  },
  {
    name: "Amanpreet Bhogal",
    role: "Co-Producer",
    photoUrl: "/team/placeholder.jpg",
    description: `Amanpreet graduated with her Bachelor of Science in Psychology in 2019 and is one of the co-producers of the brainSTEM podcast. Aman is passionate about making science accessible to everyone which she believes can be done in various creative avenues. Aman has worked in various neuroscience research labs and is currently pursuing a post graduate degree in Health Informatics from the University of Michigan.`,
  },
  {
    name: "Gabby Marumag",
    role: "Co-Producer",
    photoUrl: "/team/placeholder.jpg",
    description: `Gabby is a Co-Producer for the brainSTEM podcast. She is passionate about science communication and storytelling.`,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const TeamMemberCard = ({
  name,
  role,
  photoUrl,
  description,
  isAlternate,
}: TeamMemberProps) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`flex flex-col md:flex-row ${
        isAlternate ? "md:flex-row-reverse" : ""
      } items-center gap-8 md:gap-12 py-10 sm:py-12`}
    >
      {/* Photo + name + role */}
      <div className="flex flex-col items-center flex-shrink-0 w-36">
        <div className="relative z-10 w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-1 ring-white/10 mb-4">
          <Image
            src={photoUrl}
            alt={`${name}'s photo`}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide z-10 whitespace-nowrap">
          {name}
        </h3>
        <p className="text-xs z-10 sm:text-sm text-white/50 uppercase tracking-[0.15em] mt-1 font-light">
          {role}
        </p>
      </div>

      {/* Divider line */}
      <div className="w-16 h-px md:w-px md:h-24 bg-white/10 flex-shrink-0" />

      {/* Team member Description */}
      <div className="text-sm sm:text-base text-white z-10 leading-relaxed font-light md:text-left min-w-0 flex-1 space-y-4">
        {Array.isArray(description) ? (
          description.map((para, i) => <p key={i}>{para}</p>)
        ) : (
          <p>{description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default function TeamSection() {
  return (
    <section id="about" className="w-full py-10 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs tracking-[0.2em] uppercase text-white/50 mb-8 sm:mb-10 font-light"
        >
          Meet the team
        </motion.p>

        {/* Team members — separated by hairline dividers */}
        <div className="flex flex-col divide-y divide-white/10">
          {teamData.map((member, index) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              photoUrl={member.photoUrl}
              description={member.description}
              isAlternate={index % 2 === 1}
            />
          ))}
        </div>

        {/* Divider bottom */}
        <div className="h-px bg-white/10 mt-2" />
      </div>
    </section>
  );
}
