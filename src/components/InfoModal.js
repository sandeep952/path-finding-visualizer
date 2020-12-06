import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const tutorial = [
  {
    title: "Welcome to Pathfinding Visualizer",
    content: [
      `This short tutorial will walk you through all of the features of this application.`,
      `If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!`,
    ],
  },
  {
    title: "What is a pathfinding algorithm?",
    content: [
      `A pathfinding algorithm finds the shortest path between two points. This application visualizes Breadth First Search (BFS) pathfinding algorithm!`,
      `A BFS alogrithm moves level by level.
      We can either move right,left ,up or down and movements from a node to another have a "cost" of 1.`,
    ],
  },
  {
    title: "Adding walls ",
    content: [
      `You can switch to wall mode by clicking on the checkbox and add walls in the grid.`,
      `A wall will block the path and will now allow you to go through.`,
    ],
  },
];

const InfoModal = (props) => {
  const { showModal, toggleModal } = props;

  const [currStep, setcurrStep] = useState(0);

  const nextStep = () => setcurrStep(currStep + 1);

  const previousStep = () => setcurrStep(currStep - 1);
  const isLastSlide = currStep === tutorial.length - 1;
  const isFirstSlide = currStep === 0;

  return (
    <div>
      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <span style={{ fontSize: 28 }} className="text-center">
            {tutorial[currStep].title}
          </span>
        </ModalHeader>
        <ModalBody>
          <div className="text-center lead">
            <p>{tutorial[currStep].content[0]}</p>

            <p style={{ fontSize: 18 }}>{tutorial[currStep].content[1]}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            {isLastSlide ? "Finish" : "Skip tutorial"}
          </Button>
          {!isFirstSlide && (
            <Button color="primary" onClick={previousStep}>
              Previous
            </Button>
          )}
          <Button color="primary" onClick={nextStep} disabled={isLastSlide}>
            Next
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default InfoModal;
