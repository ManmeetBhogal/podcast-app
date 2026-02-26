import { px } from "framer-motion";
import Image from "next/image";

// Define team member properties
interface TeamMemberProps {
  name: string;
  role: string;
  photoUrl: string;
  description: string;
  isAlternate?: boolean; // prop for alternating layout
}

// Data for team members
const teamData: TeamMemberProps[] = [
  {
    name: "Dr. Hilary Marusak",
    role: "Host",
    photoUrl: "/team/placeholder.jpg",
    description: `Dr. Marusak is a neuroscientist at Wayne State University, and directs the WSU THINK Lab. 
                        The THINK lab studies brain development in children and adolescents and the impacts of environmental 
                        stress on the brain, as well as anxiety & PTSD. Dr. Marusak is interested in neuroscience communication
                         and science-advocacy.`,
  },
  {
    name: "Manmeet Bhogal",
    role: "Co-Producer",
    photoUrl: "/team/Manmeet.jpg",
    description: `Manmeet is a Co-Producer and the audio engineer for the brainSTEM podcast. He is passionate about science
                        communication through storytelling. Manmeet has a background in computer science with an undergraduate degree from
                        Wayne State University.`,
  },
  {
    name: "Amanpreet Bhogal",
    role: "Co-Producer",
    photoUrl: "/team/placeholder.jpg",
    description: `Amanpreet graduated with her Bachelor of Science in Psychology in 2019 and is one of the co-producers of the brainSTEM
                        podcast. Aman is passionate about making science accessible to everyone which she believes can be done in various
                        creative avenues. Aman has worked in various neuroscience research labs is currently pursuing a post graduate degree 
                        in Health Informatics from the University of Michigan.`,
  },
  {
    name: "Gabby Marumag",
    role: "Co-Producer",
    photoUrl: "/team/placeholder.jpg",
    description: `Gabby is a Co-Producer for the brainSTEM podcast. She is passionate about science communication and storytelling.`,
  },
];

const TeamMemberCard = ({
  name,
  role,
  photoUrl,
  description,
  isAlternate,
}: TeamMemberProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className={`flex ${isAlternate ? "md:flex-row-reverse" : "md:flex-row"} md:items-center justify-between`}>

        <div className="w-1/2 flex flex-col items-center">

          {/* Circular image wrapper */}
          <div className="relative w-36 h-36 rounded-full overflow-hidden mb-4 z-20">
            <Image
              src={photoUrl}
              alt={`'${name}'s photo`}
              layout="fill"
              objectFit="cover"
            />
          </div>

          <h3 className="text-xl font-bold">{name}</h3>
          <p className="mb-3">{role}</p>
        </div>
        <div className={`md:w-1/2 ${isAlternate ? "md:ml-8" : "md:mr-8"}`}>
          <p className="mb-3">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default function TeamSection() {
  return (
    <section className="team-section">
      <h2 className="lg:text-3xl font-bold text-center mb-4">Meet the team</h2>

      <div className="team-members-container max-w-4xl mx-auto">
        {teamData.map((member, index) => (
          <TeamMemberCard
            key={member.name}
            name={member.name}
            role={member.role}
            photoUrl={member.photoUrl}
            description={member.description}
            isAlternate={index % 2 === 1} // Alternate starting from the second member
          />
        ))}
      </div>

      
    </section>
  );
}
