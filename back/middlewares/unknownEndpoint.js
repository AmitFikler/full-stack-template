const unknownEndpoint = (req, res, next) => {
  // if i got to this middleware then i missed something lol :D
  res.status(404).json({ error: "unknown endpoint" });
};

module.exports = unknownEndpoint;
