const { httpGet } = require('./mock-http-interface');

/**
 * @param {GetArnieQuotesInput} urls
 * @returns {ArnieQuoteResponse}
 */
const getArnieQuotes = async (urls) => Promise.all(urls.map(getArnieQuote));

const getArnieQuote = async (url) => {
  try {
    const { status, body } = await httpGet(url);
    const { message } = JSON.parse(body);

    return status === 200
      ? { 'Arnie Quote': message }
      : { 'FAILURE': message };
  } catch (error) {
    // The mock httpGet never rejects, but a real client could throw (network
    // error, non-JSON body), so we surface any such failure as a FAILURE result.
    return { 'FAILURE': error.message };
  }
};

module.exports = {
  getArnieQuotes,
};
