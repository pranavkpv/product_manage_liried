const reportService = require("../services/report.service");

exports.getProductReport = async (req, res) => {
  try {
    const report = await reportService.getProductReport();

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
