const reportRepository = require("../repositories/report.repository");

exports.getProductReport = async () => {
  const result = await reportRepository.getProductSummary();

  return {
    totalProducts: result.totalProducts,
    totalQuantity: result.totalQuantity,
    totalValue: result.totalValue,
  };
};
