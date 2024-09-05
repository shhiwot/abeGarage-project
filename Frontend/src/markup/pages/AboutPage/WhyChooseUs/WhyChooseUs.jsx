// import React from 'react';
// import { FaCheckCircle, FaClock, FaDollarSign, FaAward } from 'react-icons/fa'; // Import specific icons
// import './WhyChooseUs.css';

// const WhyChooseUs = () => {
//   const benefits = [
//     { icon: <FaCheckCircle />, text: 'Certified Expert Mechanics' },
//     { icon: <FaClock />, text: 'Fast And Quality Service' },
//     { icon: <FaDollarSign />, text: 'Best Prices in Town' },
//     { icon: <FaAward />, text: 'Awarded Workshop' },
//   ];

//   return (
//     <section className="why-choose-us">
//       <h2>Why Choose Us</h2>
//       <ul className="benefits-list">
//         {benefits.map((benefit, index) => (
//           <li key={index}>
//             <img src={benefit.icon} alt={benefit.text} />
//             <p>{benefit.text}</p>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// };

// export default WhyChooseUs;


// import React from 'react';
// import { FaUserTie, FaClock, FaDollarSign, FaAward } from 'react-icons/fa';
// import './WhyChooseUs.css';

// const WhyChooseUs = () => {
//   const benefits = [
//     { icon: <FaUserTie />, text: 'Certified Expert Mechanics' },
//     { icon: <FaClock />, text: 'Fast And Quality Service' },
//     { icon: <FaDollarSign />, text: 'Best Prices in Town' },
//     { icon: <FaAward />, text: 'Awarded Workshop' },
//   ];

//   return (
//     <section className="why-choose-us">
//       <h2>Why Choose Us</h2>
//       <p>Bring to the table win-win survival strategies to ensure proactive domination. 
//         </p>
//         <p>
//         At the end of the day, going forward, a new normal that has evolved from
//         </p>
//         <p>
//         generation heading towards.
//         </p>
       
       
//       <ul className="benefits-list">
//         {benefits.map((benefit, index) => (
//           <li key={index}>
//             <div className="icon">{benefit.icon}</div>
//             <p>{benefit.text}</p>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// };

// export default WhyChooseUs;
import React from 'react';
import { FaUserTie, FaClock, FaDollarSign, FaAward } from 'react-icons/fa';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const benefits = [
    { icon: <FaUserTie />, text: 'Certified Expert Mechanics' },
    { icon: <FaClock />, text: 'Fast And Quality Service' },
    { icon: <FaDollarSign />, text: 'Best Prices in Town' },
    { icon: <FaAward />, text: 'Awarded Workshop' },
  ];

  return (
    <section className="why-choose-us">
      <h2>Why Choose Us</h2>
      <p>Bring to the table win-win survival strategies to ensure proactive domination.</p>
      <p>At the end of the day, going forward, a new normal that has evolved from</p>
      <p>generation heading towards.</p>
      <ul className="benefits-list">
        {benefits.map((benefit, index) => (
          <li key={index}>
            <div className="icon">{benefit.icon}</div>
            <p>{benefit.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhyChooseUs;
