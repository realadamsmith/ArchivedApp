import ReviewTok from "./index.js";
import MainLayout from "../../layouts/MainLayout";
import MediaQuery from "react-responsive";
import "./actual.scss";
import { useIonToast, createGesture, IonModal, IonContent } from "@ionic/react";
import Modal from "../../components/Modal/index.js";


// Trying to put MainLayout over the Feed by thru the
// max-width: 1024
const ReviewToks = () => (
    <div>
        <MediaQuery minWidth={1025}>
            {(matches) => {
                return matches ? (
                    <MainLayout>
                        <ReviewTok></ReviewTok>
                    </MainLayout>
                ) : (
                    <IonModal isOpen={true}>
                    <ReviewTok></ReviewTok>
                    </IonModal>
                    // Have a listener, if ReviewTok not in sight, history.goBack()
                );
            }}
        </MediaQuery>
    </div>
);

export default ReviewToks;
