/* NEEDED PACKAGES */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var ejs = require('ejs');
var session = require('express-session');
var cors = require('cors');
// =====================================================================================================================

/* DECLARING THE PLATFORM CONTROLLERS */
var authController = require('./controllers/authController');
var newsController = require('./controllers/newsController');
var curricularController = require('./controllers/curricularDataController');
var workExperienceController = require('./controllers/workExperienceController');
var vehiclesController = require('./controllers/vehiclesController');
var remunerationController = require('./controllers/remunerationContoller');
var debtController = require('./controllers/debtController');
var immovablePropertiesController = require('./controllers/immovablePropertiesController');
var interestConflictController = require('./controllers/interestConflictController');
var investmentController = require('./controllers/investmentController');
var relativesController = require('./controllers/relativesController');
const declarationController = require('./controllers/patrimonialDeclarationController');
// =====================================================================================================================

/* CONNECTION TO MONGO DB */
mongoose.connect('mongodb://localhost:27017/ws-desipa');
// =====================================================================================================================

/* CREATE OR EXPRESS APP */
var app = express();
// =====================================================================================================================

/* DECLARING CORS FOR PLATFORM */
app.use(cors());
// =====================================================================================================================

/* USE THE BODY-PARSER PACKAGE IN OUR APPLICATION */
app.use(bodyParser.urlencoded({
    extended: true
}));
// =====================================================================================================================

/* Use the passport package in our application */
app.use(passport.initialize());
// =====================================================================================================================

/* Use environment defined port or 3000 */
var port = process.env.PORT || 3500;
// =====================================================================================================================

/* Create our Express router */
var router = express.Router();
// =====================================================================================================================

/* ENDPOINTS */
//////////////////////////////////////   NEWS ENDPOINT     /////////////////////////////////////////////////////////////
router.route('/news')
    .get(authController.isBearerAuthenticated, newsController.getNews);

////////////////////////////////     CURRICULAR DATA ENDPOINTS    //////////////////////////////////////////////////////
router.route('/curricularData')
    .post(authController.isBearerAuthenticated, curricularController.postCurricularData);
router.route('/curricularData/:userId')
    .get(authController.isBearerAuthenticated, curricularController.getCurricularData)
    .put(authController.isBearerAuthenticated, curricularController.putCurricularData)
    .delete(authController.isBearerAuthenticated, curricularController.deleteCurricularData); // DELETES ALL CURRICULAR DATA (CAUTION)
router.route('/curricularData/add')
    .put(authController.isBearerAuthenticated, curricularController.pushCurricularData);
router.route('/curricularData/remove')
    .put(authController.isBearerAuthenticated, curricularController.pullCurricularData);

//////////////////////////////   WORK EXPERIENCE ENDPOINTS /////////////////////////////////////////////////////////////
router.route('/workExperience')
    .post(authController.isBearerAuthenticated, workExperienceController.postWorkExperience);
router.route('/workExperience/:userId')
    .get(authController.isBearerAuthenticated, workExperienceController.getWorkExperienceById)
    .put(authController.isBearerAuthenticated, workExperienceController.updateWorkExperience)
    .delete(authController.isBearerAuthenticated, workExperienceController.deleteWorkExperience); //DELETES ALL WORK EXPERIENCES (CAUTION)
router.route('/workExperience/add')
    .put(authController.isBearerAuthenticated, workExperienceController.pushWorkExperience);
router.route('/workExperience/remove')
    .put(authController.isBearerAuthenticated, workExperienceController.pullWorkExperience);

///////////////////////////////////////    VEHICLES          ///////////////////////////////////////////////////////////
router.route('/vehicles')
    .post(authController.isBearerAuthenticated, vehiclesController.postVehicle);
router.route('/vehicles/:userId')
    .get(authController.isBearerAuthenticated, vehiclesController.getVehicles)
    .put(authController.isBearerAuthenticated, vehiclesController.putVehicles);
router.route('/vehicles/get/:id')
    .get(authController.isBearerAuthenticated, vehiclesController.getVehicleById);

//////////////////////////////////////////////   REMUNERATION       ////////////////////////////////////////////////////
router.route('/remuneration')
    .post(authController.isBearerAuthenticated, remunerationController.postRemuneration);
router.route('/remuneration/:userId')
    .get(authController.isBearerAuthenticated, remunerationController.getRemuneration)
    .put(authController.isBearerAuthenticated, remunerationController.putRemuneration);
router.route('/remuneration/get/:id')
    .get(authController.isBearerAuthenticated, remunerationController.getRemunerationById);

//////////////////////////////   DEBT ENDPOINTS ////////////////////////////////////////////////////////////////////////
router.route('/debt')
    .post(authController.isBearerAuthenticated, debtController.postDebt);
router.route('/debt/:userId')
    .get(authController.isBearerAuthenticated, debtController.getDebt)
    .put(authController.isBearerAuthenticated, debtController.putDebt);
router.route('/debt/get/:id')
    .get(authController.isBearerAuthenticated, debtController.getDebtById);

//////////////////////////////  IMMOVABLE PROPERTIES ENDPOINTS /////////////////////////////////////////////////////////
router.route('/immovableProperties')
    .post(authController.isBearerAuthenticated, immovablePropertiesController.postImmovableProperties);
router.route('/immovableProperties/:userId')
    .get(authController.isBearerAuthenticated, immovablePropertiesController.getImmovableProperties)
    .put(authController.isBearerAuthenticated, immovablePropertiesController.putImmovableProperties);
router.route('/immovableProperties/get/:id')
    .get(authController.isBearerAuthenticated, immovablePropertiesController.getImmovablePropertiesById);

//////////////////////////////  INTEREST CONFLICT ENDPOINTS ////////////////////////////////////////////////////////////
router.route('/interestConflict')
    .post(authController.isBearerAuthenticated, interestConflictController.postInterestConflict);
router.route('/interestConflict/:userId')
    .get(authController.isBearerAuthenticated, interestConflictController.getInterestConflict)
    .put(authController.isBearerAuthenticated, interestConflictController.putInterestConflict);
router.route('/interestConflict/get/:id')
    .get(authController.isBearerAuthenticated, interestConflictController.getInterestConflictById);

//////////////////////////////  INVESTMENT ENDPOINTS ///////////////////////////////////////////////////////////////////
router.route('/investment')
    .post(authController.isBearerAuthenticated, investmentController.postInvestment);
router.route('/investment/:userId')
    .get(authController.isBearerAuthenticated, investmentController.getInvestment)
    .put(authController.isBearerAuthenticated, investmentController.putInvestment);
router.route('/investment/get/:id')
    .get(authController.isBearerAuthenticated, investmentController.getInvestmentById);

///////////////////////////////////////    RELATIVES ENDPOINT //////////////////////////////////////////////////////////
router.route('/relatives')
    .post(authController.isBearerAuthenticated, relativesController.postRelatives);
router.route('/relatives/:userId')
    .get(authController.isBearerAuthenticated, relativesController.getRelatives)
    .put(authController.isBearerAuthenticated, relativesController.putRelatives);
router.route('/relatives/get/:id')
    .get(authController.isBearerAuthenticated, relativesController.getRelativesById);

////////////////////////////////////////    DECLARATIONS ENDPOINTS    //////////////////////////////////////////////////
router.route('/declaration')
    .post(authController.isBearerAuthenticated, declarationController.postDeclaration);
router.route('/declaration/:decId')
    .get(authController.isBearerAuthenticated, declarationController.getDeclaration);
router.route('/declaration/vehicle/:decId')
    .get(authController.isBearerAuthenticated, vehiclesController.getVehicleByDecId);
router.route('/declaration/remuneration/:decId')
    .get(authController.isBearerAuthenticated, remunerationController.getRemunerationByDecId);
router.route('/declaration/relatives/:decId')
    .get(authController.isBearerAuthenticated, relativesController.getRelativesByDecId);
router.route('declaration/debt/:decId')
    .get(authController.isBearerAuthenticated, debtController.getDebtByDecId);
router.route('declaration/immovableProperties/:decId')
    .get(authController.isBearerAuthenticated, immovablePropertiesController.getImmovablePropertiesByDecId);
router.route('declaration/interestConflict/:decId')
    .get(authController.isBearerAuthenticated, interestConflictController.getInterestConflictByDecId);
router.route('declaration/investment/:decId')
    .get(authController.isBearerAuthenticated, investmentController.getInvestmentByDecId);

// =====================================================================================================================

/* http://localhost:3500/api */
router.get('/', function(req, res) {
    res.json({ message: 'DESIPA WS is running.' });
});
// =====================================================================================================================

/* Register all our routes with /desipa */
app.use('/desipa', router);
// =====================================================================================================================

/* Start the server */
app.listen(port);
console.log('WebDesipa is listening on port: ' + port);
// =====================================================================================================================






