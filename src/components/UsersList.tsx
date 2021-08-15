import { Accordion } from "react-bootstrap";
import { FunctionComponent } from "react";

import User from "../types/User";

export default function UsersList(props: {
  users: User[];
  query: string;
  ItemRenderer: FunctionComponent<{ user: User; index: number }>;
}) {
  const queryLowerCase = props.query.toLowerCase();
  const filteredUsers = props.users.filter(
    (user) =>
      user.username.toLowerCase().includes(queryLowerCase) ||
      user.email.toLowerCase().includes(queryLowerCase) ||
      user.name.toLowerCase().includes(queryLowerCase)
  );

  return (
    <Accordion defaultActiveKey="0" className="w-100 mb-5">
      {filteredUsers.length ? (
        filteredUsers.map((user, index) => {
          return <props.ItemRenderer user={user} index={index} key={index} />;
        })
      ) : (
        <h3>No users found</h3>
      )}
    </Accordion>
  );
}
