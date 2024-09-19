import React, { useState, useEffect } from "react";
import serviceService from "../../services/service.service"; //to perform API
import image4 from "../../assets/images/Service_miniBanner.png";
import { useAuth } from "../../Contexts/AuthContext";
function Services() {
  const [services, setServices] = useState([]); // State to hold the services data
  const [selectedService, setSelectedService] = useState(null); // State to hold the currently selected service
  const { employee } = useAuth(); //to get the current authenticated employee's details, including their token.
  useEffect(() => {
    // This function runs when the component is mounted
    const fetchServices = async () => {
      try {
        if (employee && employee.employee_token) {
          //Calls the getAllServices method from the serviceService with the employee's token to fetch the service data.
          const result = await serviceService.getAllServices(
            employee.employee_token
          );
          console.log(result);
          if (result) {
            // Fetch services from backend API
            setServices(result); // Update state with fetched data
          } else {
            throw new Error("Failed to fetch services");
          }
        }
      } catch (error) {
        console.error("Error fetching services:", error); // Log any errors
      }
    };
    fetchServices(); // Call the function to fetch services
  }, [employee]);
  const servicesCategory = [
    {
      title: "Performance Upgrade",
      description:
        "Unlock your vehicle’s full potential with our advanced performance upgrade services. From ECU remapping to turbocharger installations, our experts enhance power, torque, and fuel efficiency for a superior driving experience. Learn more about our range of upgrades tailored to your needs, and schedule a consultation to elevate your vehicle's performance today!",
      iconClass: "flaticon-power",
      servicesList: [
        {
          name: services[7]?.service_name ?? "Loading...",
          description: services[7]?.service_description ?? "Loading...",
        },
        {
          name: services[8]?.service_name ?? "Loading...",
          description: services[8]?.service_description ?? "Loading...",
        },
        {
          name: services[9]?.service_name ?? "Loading...",
          description: services[9]?.service_description ?? "Loading...",
        },
      ],
    },
    {
      title: "Transmission Services",
      description:
        "Ensure smooth and efficient gear shifts with our comprehensive transmission services. Our skilled technicians specialize in transmission fluid changes, clutch replacements, and full transmission rebuilds to maintain your vehicle’s optimal performance.Learn more about the importance of regular transmission maintenance, explore our reliable services, and book an appointment for a smoother drive.",
      iconClass: "flaticon-gearbox",
      servicesList: [
        //    {
        //      name:services[2]?.service_name ?? "Loading...",
        //      description:services[2]?.service_description ?? "Loading...",
        //    },
        //    {
        //      name:services[10]?.service_name ?? "Loading...",
        //      description:services[10]?.service_description ?? "Loading...",
        //    },
        //    {
        //      name:services[11]?.service_name ?? "Loading...",
        //      description:services[11]?.service_description ?? "Loading...",
        //    },
        //    {
        //      name:services[12]?.service_name ?? "Loading...",
        //      description:services[12]?.service_description ?? "Loading...",
        //    },
      ],
    },
    {
      title: "Break Repair & Service",
      description:
        "We all know why brake work is important, especially because one quarter of all car accidents are caused by a failure to stop.Discover why we are the trusted choice for comprehensive brake repair and service solutions. Our certified technicians specialize in brake pad replacements, rotor repairs, and complete brake system diagnostics to ensure your vehicle's safety and performance. Learn more about the importance of regular brake maintenance, explore our reliable and affordable brake solutions, and schedule an appointment today to keep your car safe on the road.",
      iconClass: "flaticon-brake-disc",
      servicesList: [
        {
          name: services[13]?.service_name ?? "Loading...",
          description: services[13]?.service_description ?? "Loading...",
        },
        {
          name: services[14]?.service_name ?? "Loading...",
          description: services[14]?.service_description ?? "Loading...",
        },
        {
          name: services[15]?.service_name ?? "Loading...",
          description: services[15]?.service_description ?? "Loading...",
        },
        {
          name: services[16]?.service_name ?? "Loading...",
          description: services?.service_description ?? "Loading...",
        },
      ],
    },
    {
      title: "Engine Service & Repair",
      description:
        "Keep your engine running smoothly with our expert engine service and repair solutions. From oil changes and spark plug replacements to full engine diagnostics, our experienced team ensures your vehicle performs at its best. Learn more about our comprehensive engine care services, the benefits of regular maintenance, and book a service to maintain your engine’s health and efficiency.",
      iconClass: "flaticon-car-engine",
      servicesList: [
        {
          name: services[0]?.service_name ?? "Loading...",
          description: services[0]?.service_description ?? "Loading...",
        },
        {
          name: services[1]?.service_name ?? "Loading...",
          description: services[1]?.service_description ?? "Loading...",
        },
        {
          name: services[3]?.service_name ?? "Loading...",
          description: services[3]?.service_description ?? "Loading...",
        },
        {
          name: services[17]?.service_name ?? "Loading...",
          description: services[17]?.service_description ?? "Loading...",
        },
        {
          name: services[18]?.service_name ?? "Loading...",
          description: services[18]?.service_description ?? "Loading...",
        },
      ],
    },
    {
      title: "Tyre & Wheels",
      description:
        "Maximize safety and driving comfort with our tyre and wheel services. Whether you need tire repairs, replacements, or wheel alignments, our specialists ensure optimal road grip and fuel efficiency.Learn more about our full range of tyre and wheel services, the importance of regular checks, and book an appointment to keep your vehicle rolling smoothly.",
      iconClass: "flaticon-tire",
      servicesList: [
        {
          name: services[5]?.service_name ?? "Loading...",
          description: services[5]?.service_description ?? "Loading...",
        },
        {
          name: services[19]?.service_name ?? "Loading...",
          description: services[19]?.service_description ?? "Loading...",
        },
        {
          name: services[20]?.service_name ?? "Loading...",
          description: services[20]?.service_description ?? "Loading...",
        },
        {
          name: services[21]?.service_name ?? "Loading...",
          description: services[21]?.service_description ?? "Loading...",
        },
      ],
    },
    {
      title: "Denting & Painting",
      description:
        "Restore your vehicle’s original beauty with our professional denting and painting services. From minor scratch repairs to complete paint jobs, our experts use high-quality materials to give your car a flawless finish. Learn more about our paint restoration and dent repair options, see our competitive pricing, and schedule a visit to bring back your car's showroom shine.",
      iconClass: "flaticon-spray-gun",
      servicesList: [
        {
          name: services[22]?.service_name ?? "Loading...",
          description: services[22]?.service_description ?? "Loading...",
        },
        {
          name: services[23]?.service_name ?? "Loading...",
          description: services[23]?.service_description ?? "Loading...",
        },
        {
          name: services[24]?.service_name ?? "Loading...",
          description: services[24]?.service_description ?? "Loading...",
        },
        {
          name: services[25]?.service_name ?? "Loading...",
          description: services[25]?.service_description ?? "Loading...",
        },
      ],
    },
  ];
  const handleReadMoreClick = (service) => {
    setSelectedService(service); // Set the selected service when "Read More" is clicked
  };

  const renderServiceBlock = (service, index) => (
    <div className="col-lg-6 service-block-one" key={index}>
      <div className="inner-box hvr-float-shadow">
        <h5>Service and Repairs</h5>
        <h2>{service.title}</h2>
        <a
          href="#"
          className="read-more"
          onClick={() => handleReadMoreClick(service)}
          aria-label={`Read more about ${service.title}`}
        >
          read more +
        </a>
        <div className="icon">
          <span className={service.iconClass}></span>
        </div>
      </div>
    </div>
  );
  if (selectedService) {
    return (
      <div className="homeWrapper">
        <div className="video2-section">
          <div data-parallax='{"y": 50}' className="services-bg1"></div>
        </div>
        <div className="services-section">
          <div className="service-block-one auto-container">
            <div className="inner-box hvr-float-shadow">
              <h2>{selectedService.title}</h2>
              <p>{selectedService.description}</p>
              <h4>Service List</h4>
              {selectedService.servicesList && (
                <ul className="service-list">
                  {selectedService?.servicesList.map((item, index) => (
                    <li key={index}>
                      <strong>{item?.name}</strong>:{" "}
                      <span>{item?.description}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-3">
                <a
                  href="#"
                  onClick={() => setSelectedService(null)}
                  style={{ fontSize: "17px", fontWeight: "600" }}
                >
                  Back to Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="homeWrapper">
      <section className="video2-section">
        <div data-parallax='{"y": 50}' className="services-bg1"></div>
      </section>
      <section className="services-section">
        <div className="auto-container">
          <div className="sec-title style-two">
            <h2>Our Services</h2>
            <div className="text">
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution.
            </div>
          </div>
          <div className="row">
            {servicesCategory.map((service) => renderServiceBlock(service))}
          </div>
        </div>
      </section>

      <section className="why-choose-us">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="sec-title style-two">
                <h2>Why Choose Us</h2>
                <div className="text">
                  Bring to the table win-win survival strategies to ensure
                  proactive domination. At the end of the day, going forward, a
                  new normal that has evolved from generation heading towards.
                </div>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-mechanic"></span>
                </div>
                <h4>Certified Expert Mechanics</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-wrench"></span>
                </div>
                <h4>Fast And Quality Service</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-price-tag-1"></span>
                </div>
                <h4>Best Prices in Town</h4>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-trophy"></span>
                </div>
                <h4>Awarded Workshop</h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sec-title style-two">
                <h2>Additional Services</h2>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <div className="image4">
                    <img src={image4} alt="" />
                  </div>
                </div>
                <div className="col-md-7">
                  <ul className="list">
                    <li>General Auto Repair & Maintenance</li>
                    <li>Transmission Repair & Replacement</li>
                    <li>Tire Repair and Replacement</li>
                    <li>State Emissions Inspection</li>
                    <li>Brake Job / Brake Services</li>
                    <li>Electrical Diagnostics</li>
                    <li>Fuel System Repairs</li>
                    <li>Starting and Charging Repair</li>
                    <li>Steering and Suspension Work</li>
                    <li>Emission Repair Facility</li>
                    <li>Wheel Alignment</li>
                    <li>Computer Diagnostic Testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="video3-section another-section">
        <div data-parallax='{"y": 50}' className="services-bg2"></div>
      </section>

      <section className="cta-section">
        <div className="auto-container">
          <div className="wrapper-box">
            <div className="left-column">
              <h3>Schedule Your Appointment Today</h3>
              <div className="text">
                Your Automotive Repair & Maintenance Service Specialist
              </div>
            </div>
            <div className="right-column">
              <div className="phone">1800.456.7890</div>
              <div className="btn">
                <a href="#" className="theme-btn btn-style-one">
                  <span>Appointment</span>
                  <i className="flaticon-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
