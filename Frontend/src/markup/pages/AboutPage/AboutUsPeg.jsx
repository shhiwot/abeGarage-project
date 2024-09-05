import React from 'react'
import Introduction from './Introduction/Introduction';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
import AdditionalServices from './AdditionalServices/AdditionalServices';
import CallToAction from './CallToAction/CallToAction';
import MainBannerr from './LastBanner/MainBannerr';
import MainBanner from "./MainBanner/MainBanner"
import Experience from "./Experience/Experience"
import "./style.css"
const AboutusPeg = () => {
  return (
    <div>
      <div className="App">
        <MainBanner />
        {/* <Introduction /> */}
        <Introduction />
        <Experience />
        <div className="app-container">
          <WhyChooseUs />
          <AdditionalServices />
        </div>
        {/* <WhyChooseUs />
      <AdditionalServices /> */}
        <CallToAction />
        <MainBannerr />
      </div>
    </div>
  );
}

export default AboutusPeg
