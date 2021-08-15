import { render, screen } from "@testing-library/react";
import UsersList from "../UsersList";

const unfilteredUserTestData = [
  {
    id: "1",
    name: "Jelly Belly",
    website: "kittenmilk.biz",
    phone: "0744 000 9984",
    username: "Dobby",
    email: "kittenpaws@sphinx.net",
  },
  {
    id: "2",
    name: "Jarvis Potty",
    website: "tortoiselife.biz",
    phone: "0744 000 7878",
    username: "theTortoise",
    email: "onthegrass@gmail.com",
  },
  {
    id: "3",
    name: "Burgh the Burgh",
    website: "chocolateforburghs.org",
    phone: "0744 000 8686",
    username: "Burgh",
    email: "beartrepreneur@burgh.net",
  },
];

test("all users shown when query empty", () => {
  render(
    <UsersList
      users={unfilteredUserTestData}
      query=""
      ItemRenderer={({ user }) => <div data-testid="user">{user.name}</div>}
    />
  );
  const filteredUsers = screen.queryAllByTestId("user");
  expect(filteredUsers).toHaveLength(3);
});

test("list filters by query", () => {
  render(
    <UsersList
      users={unfilteredUserTestData}
      query="Jelly"
      ItemRenderer={({ user }) => <div>{user.name}</div>}
    />
  );
  const filteredUser = screen.getByText(/Jelly Belly/i);
  expect(filteredUser).toBeInTheDocument();
});

test("list filtered when query case mixed", () => {
  render(
    <UsersList
      users={unfilteredUserTestData}
      query="Jelly"
      ItemRenderer={({ user }) => <div>{user.name}</div>}
    />
  );
  const filteredUser = screen.getByText(/Jelly Belly/i);
  expect(filteredUser).toBeInTheDocument();
});

test("list updates when value changes", () => {
  const { rerender } = render(
    <UsersList
      users={unfilteredUserTestData}
      query="KiTTenPAws"
      ItemRenderer={({ user }) => <div>{user.name}</div>}
    />
  );

  rerender(
    <UsersList
      users={unfilteredUserTestData}
      query="Burgh"
      ItemRenderer={({ user }) => <div>{user.name}</div>}
    />
  );
  const filteredUser = screen.getByText(/Burgh the Burgh/i);
  expect(filteredUser).toBeInTheDocument();
});

test("list shows no users found when no users match", () => {
  render(
    <UsersList
      users={unfilteredUserTestData}
      query="iDoNotExist"
      ItemRenderer={({ user }) => <div>{user.name}</div>}
    />
  );
  const filteredUser = screen.getByText(/No users found/i);
  expect(filteredUser).toBeInTheDocument();
});
