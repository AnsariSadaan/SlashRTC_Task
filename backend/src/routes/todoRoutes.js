import { Router } from 'express';
import { createTodo, deleteTodo, getCompletedTodo, getImportantTodo, getIncompletedTodo, getTodo, updateCompletedTodo, updateImpTodo, updateTodo } from '../controllers/taskController.js';
import { loginUser, logoutUser, registerUser } from '../controllers/authController.js';
import {authToken} from '../middleware/authMiddleware.js'
const router = Router()

router.route('/create-todo').post(authToken, createTodo);
router.route('/get-all-todos').get(authToken, getTodo);
router.route('/update-todo/:id').put(authToken, updateTodo);
router.route('/delete/:id').delete(authToken, deleteTodo);
router.route('/get-imp-todo').get(authToken, getImportantTodo);
router.route('/update-imp-todo/:id').put(authToken, updateImpTodo);
router.route('/get-completed-todo').get(authToken, getCompletedTodo);
router.route('/update-completed-todo/:id').put(authToken, updateCompletedTodo)
router.route('/get-incompleted-todo').get(authToken, getIncompletedTodo)


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
export default router;