function Dashboard({ color, icon, name, count }) {
  return (
    <>
      <div className={`TaskItem br-${color}`}>
        <div className={`${color} circle`}>{icon}</div>
        <div className={`taskHeading ${color}`}>{name}</div>
        <div className="count">{count}</div>
      </div>
    </>
  );
}

export default Dashboard;
