import React from "react";

const skillsContent = [
  // Frontend
  { skillClass: "p100", skillPercent: "100", skillName: "HTML5" },
  { skillClass: "p96", skillPercent: "96", skillName: "CSS3" },
  { skillClass: "p91", skillPercent: "91", skillName: "JavaScript" },
  { skillClass: "p89", skillPercent: "89", skillName: "TailwindCSS" },
  { skillClass: "p76", skillPercent: "76", skillName: "React" },
  { skillClass: "p55", skillPercent: "55", skillName: "Angular" },
  { skillClass: "p30", skillPercent: "30", skillName: "Vue.js" },
  { skillClass: "p60", skillPercent: "60", skillName: "TypeScript" },
  { skillClass: "p65", skillPercent: "65", skillName: "Node.js" },
  { skillClass: "p85", skillPercent: "85", skillName: "Express.js" },
  { skillClass: "p70", skillPercent: "70", skillName: "JWT" },
  { skillClass: "p90", skillPercent: "90", skillName: "REST APIs" },
  { skillClass: "p100", skillPercent: "100", skillName: "PHP 8" },
  { skillClass: "p87", skillPercent: "87", skillName: "Laravel" },
  { skillClass: "p94", skillPercent: "94", skillName: "Yii" },
  { skillClass: "p40", skillPercent: "40", skillName: "Python" },
  { skillClass: "p100", skillPercent: "100", skillName: "PostgreSQL" },
  { skillClass: "p100", skillPercent: "100", skillName: "MariaDB" },
  { skillClass: "p89", skillPercent: "89", skillName: "MongoDB" },
  { skillClass: "p88", skillPercent: "88", skillName: "Redis" },
  { skillClass: "p72", skillPercent: "72", skillName: "Oracle" },
  { skillClass: "p89", skillPercent: "89", skillName: "Linux" },
  { skillClass: "p85", skillPercent: "85", skillName: "Git" },
  { skillClass: "p83", skillPercent: "83", skillName: "Azure" },
  { skillClass: "p65", skillPercent: "65", skillName: "AWS" },
  { skillClass: "p55", skillPercent: "55", skillName: "Docker" },
  { skillClass: "p78", skillPercent: "78", skillName: "SSH" },
  { skillClass: "p60", skillPercent: "60", skillName: "IIS" },
  { skillClass: "p100", skillPercent: "100", skillName: "WordPress" },
  { skillClass: "p87", skillPercent: "87", skillName: "PrestaShop" },
  { skillClass: "p80", skillPercent: "80", skillName: "Shopify" },
  { skillClass: "p30", skillPercent: "30", skillName: "Joomla" },
  { skillClass: "p50", skillPercent: "50", skillName: "Drupal" },
  { skillClass: "p98", skillPercent: "98", skillName: "Wix" },
  { skillClass: "p90", skillPercent: "90", skillName: "SCRUM" },
  { skillClass: "p85", skillPercent: "85", skillName: "Kanban" },
  { skillClass: "p95", skillPercent: "95", skillName: "UX/UI" },
  { skillClass: "p85", skillPercent: "85", skillName: "Vite / Webpack" },
  { skillClass: "p32", skillPercent: "32", skillName: "Figma" },
  { skillClass: "p75", skillPercent: "75", skillName: "Adobe XD" },
  { skillClass: "p69", skillPercent: "69", skillName: "Photoshop" },
  { skillClass: "p30", skillPercent: "30", skillName: "Illustrator" },
  { skillClass: "p41", skillPercent: "41", skillName: "Premiere" },
];


const Skills = () => {
  return (
    <>
      {skillsContent.map((val, i) => (
        <div className="col-4 col-md-2 mb-3 mb-sm-4 text-center" key={i}>
          <div className={`c100 ${val.skillClass}`}>
            <span >{val.skillPercent}%</span>
            <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
            </div>
          </div>
          <h6
            className="open-sans-font mt-2 mb-0"
            style={{ fontSize: "0.75rem", wordBreak: "break-word" }}
          >
            {val.skillName}
          </h6>
        </div>
      ))}
    </>
  );
};

export default Skills;
