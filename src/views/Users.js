import { Link } from "react-router-dom";

const Users = ({ users }) => {
  if (users) {
    const userList = users.map((user) => {
      return (
        <div key={user.id}>
          <table>
            <tbody>
              <tr>
                <td width="120px">
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
    return (
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <th width="120px"></th>
              <th>blogs created</th>
            </tr>
          </tbody>
        </table>
        {userList}
      </div>
    );
  }
};

export default Users;
