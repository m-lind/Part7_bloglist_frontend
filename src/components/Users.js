const Users = ({ userBlogCountMap }) => {
  const users = userBlogCountMap;
  if (users) {
    const userList = Object.keys(users).map((username) => {
      return (
        <div key={username}>
          <table>
            <tbody>
              <tr>
                <td width="120px">{userBlogCountMap[username].name}</td>
                <td>{userBlogCountMap[username].count}</td>
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
