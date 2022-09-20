import React from "react";
import "./styles.scss";
import Buttons from "./../../components/Forms/Button";
import { useHistory } from "react-router-dom";

const AnnouncementPage = () => {
  const history = useHistory();

  return (
    <div className="WholePage">
      <div className="IndependentMainWrap">
        <div className="Opener">
          We Celebrate Technology, Creativity, Manufacturers, Sustainability and
          Style. Product Innovation is key to pushing forward. 🪐
        </div>
        <div className="Description">
          You will see this expressed through our service, website, Reviews,
          Eco-Badging, and news feed as we continue to work harder to better our
          services to have fun with more of the community daily.
        </div>
        <div className="Description">
          Video sharing has become ever so easy to do with the adoption of short
          form vertical mobile video, and we push for these goals by promoting
          great products on all video platforms with transparent vertical video
          reviews. Pushing great products to the top, and avoiding the
          repercussions of false text reviews.
        </div>
        <div className="Description">
        Download the app to get <b>250pts</b> per Review recorded, <b>1000pts</b> per 20 likes and for the mobile experience!

        </div>

        <div className="spacer"></div>
        <div className="GoBackHolder">
          <Buttons onClick={() => history.push("/Home")}>
            Come Shop and Celebrate
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPage;
