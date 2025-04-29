import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../icons/avatar.png';
import editLoginIcon from '../icons/edit_login.png';
import editBusinessIcon from '../icons/edit_business.png';
import logoutIcon from '../icons/logout.png';
import userMaintenanceIcon from '../icons/user-maintenance.png';
import getCookie from '../assets/cookies';
import deleteIcon from '../icons/delete.png';
import '../css/ProfileIcon.css';

export default function ProfileIcon() {
	const navigate = useNavigate();
	const isAdmin = getCookie('isAdmin') === 'true';
	const hasBusiness = getCookie('hasBusiness') === 'true';

	// Define states
	const [isOpen, setIsOpen] = useState(false);
	const [confirmation, setConfirmation] = useState(false);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const toUserMaintenance = (event) => {
		event.preventDefault();
		setIsOpen(false);
		navigate('/user-maintenance');
	};

	const toEditLoginInfo = (event) => {
		event.preventDefault();
		setIsOpen(false);
		navigate('/edit-login-info');
	};

	const toEditBusinessInfo = (event) => {
		event.preventDefault();
		setIsOpen(false);
		navigate('/edit-business-info');
	};

	const logout = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch(
				'http://localhost:5000/api/auth/logout',
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.ok) {
				setIsOpen(false);
				setConfirmation(true);
			} else {
				console.log('Response from server not ok');
			}
		} catch (err) {
			console.error(err);
		}
	};

	const deleteAccount = (event) => {
		event.preventDefault();
	};

	const toLogin = (event) => {
		event.preventDefault();
		setConfirmation(false);
		navigate('/');
	};

	return (
		<>
			{confirmation ? (
				<div className='confirmation-container'>
					You have been logged out successfully.
					<button
						type='button'
						onClick={toLogin}
						className='button'
					>
						Ok
					</button>
				</div>
			) : (
				<></>
			)}

			<div className='profile-icon-container'>
				<img
					src={avatar}
					alt='User Profile'
					className='avatar-icon'
					onClick={toggleDropdown}
				/>

				{isOpen && (
					<div className='dropdown-menu'>
						<div className='dropdown-user-info'>
							<span>{getCookie('fullName')}</span>
							<span>{getCookie('email')}</span>
						</div>

						{isAdmin ? (
							<div
								onClick={toUserMaintenance}
								className='dropdown-item'
							>
								<img
									src={userMaintenanceIcon}
									alt='User Maintenance Icon'
								/>
								<span>User Maintenance</span>
							</div>
						) : (
							<></>
						)}

						<div
							onClick={toEditLoginInfo}
							className='dropdown-item'
						>
							<img
								src={editLoginIcon}
								alt='Edit Login'
							/>
							<span>Edit Login Info</span>
						</div>

						{hasBusiness ? (
							<div
								onClick={toEditBusinessInfo}
								className='dropdown-item'
							>
								<img
									src={editBusinessIcon}
									alt='Edit Business'
								/>
								<span>Edit Business Info</span>
							</div>
						) : (
							<></>
						)}

						<div
							onClick={deleteAccount}
							className='dropdown-item'
						>
							<img
								src={deleteIcon}
								alt='Delete Account'
							/>
							<span>Delete Account</span>
						</div>

						<div
							onClick={logout}
							className='dropdown-item'
						>
							<img
								src={logoutIcon}
								alt='Logout'
							/>
							<span>Log Out</span>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
