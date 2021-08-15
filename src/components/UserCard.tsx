import { Accordion, Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { TelephoneFill, EnvelopeFill, LaptopFill } from "react-bootstrap-icons";
import type User from "../types/User";

export default function UserCard(props: { user: User; index: number }) {
  const onButtonClick = useAccordionButton(props.index.toString());

  return (
    <Card className="mt-1">
      <Card.Header className="p-0">
        <button
          type="button"
          onClick={onButtonClick}
          className="list-group-item d-flex justify-content-between align-items-start w-100 border-0 p-3"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold text-start">{props.user.name}</div>
            {props.user.email.toLowerCase()}
          </div>
          <span className="badge bg-secondary rounded-pill">
            {"@" + props.user.username}
          </span>
        </button>
      </Card.Header>
      <Accordion.Collapse eventKey={props.index.toString()}>
        <Card.Body>
          <h5>
            <TelephoneFill /> + {props.user.phone}
          </h5>
          <h5>
            <EnvelopeFill /> {props.user.email.toLowerCase()}
          </h5>
          <h5>
            <LaptopFill /> {props.user.website}
          </h5>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}
