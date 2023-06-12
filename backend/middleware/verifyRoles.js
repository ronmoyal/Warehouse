const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    const role = [req.role];
    const result = role
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

export default verifyRoles;
