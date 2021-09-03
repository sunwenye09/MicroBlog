const Navigation = function ({ onLogout, gohome, browseFriends }) {

  return (
    <nav>
      <ul className="navigation">
        <li><a href="#gohome" onClick={gohome}>Home</a></li>
        <li><a href="#followings" onClick={browseFriends}> People | Following</a></li>
        <li className="logout"><a href="#logout" onClick={onLogout}>Logout</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
