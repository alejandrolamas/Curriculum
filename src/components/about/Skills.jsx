import React from "react";

const skillsContent = [
  { skillClass: "p100", skillPercent: "100", skillName: "HTML5" },
  { skillClass: "p91", skillPercent: "91", skillName: "JAVASCRIPT" },
  { skillClass: "p96", skillPercent: "96", skillName: "CSS3" },
  { skillClass: "p100", skillPercent: "100", skillName: "PHP8" },
  { skillClass: "p40", skillPercent: "40", skillName: "PYTHON" },
  { skillClass: "p55", skillPercent: "55", skillName: "ANGULAR" },
  { skillClass: "p67", skillPercent: "67", skillName: "REACT" },
  { skillClass: "p75", skillPercent: "75", skillName: "GIT" },
  { skillClass: "p89", skillPercent: "89", skillName: "LINUX" },
  { skillClass: "p100", skillPercent: "100", skillName: "WORDPRESS" },
  { skillClass: "p87", skillPercent: "87", skillName: "PRESTASHOP" },
  { skillClass: "p80", skillPercent: "80", skillName: "SHOPIFY" },
  { skillClass: "p30", skillPercent: "30", skillName: "Joomla" },
  { skillClass: "p50", skillPercent: "50", skillName: "Drupal" },
  { skillClass: "p98", skillPercent: "98", skillName: "WIX" },
  { skillClass: "p69", skillPercent: "69", skillName: "PHOTOSHOP" },
  { skillClass: "p75", skillPercent: "75", skillName: "Adobe XD" },
  { skillClass: "p32", skillPercent: "32", skillName: "FIGMA" },
  { skillClass: "p30", skillPercent: "30", skillName: "Illustrator" },
  { skillClass: "p41", skillPercent: "41", skillName: "Premiere" },
];

const Skills = () => {
  return (
    <>
      {skillsContent.map((val, i) => (
        <div className="col-6 col-md-3 mb-3 mb-sm-5" key={i}>
          <div className={`c100 ${val.skillClass}`}>
            <span>{val.skillPercent}%</span>
            <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
            </div>
          </div>
          <h6 className="text-uppercase open-sans-font text-center mt-2 mt-sm-4">
            {val.skillName}
          </h6>
        </div>
      ))}
    </>
  );
};

export default Skills;
