export const staffOnly = (req, res, next) => {
    if (req.user.role === "staff" || req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        message: "Only staff can confirm bookings ❌"
      });
    }
  };
  