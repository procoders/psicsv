const psi = require("psi");

module.exports = {
  getUrlPSI: async url => {
    const { data } = await psi(url);
    return data;
  }
};
