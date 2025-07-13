import React from 'react'

const ProfileModal = ({ user, onClose }) => {
    if (!user) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>✕</button>
                <img src={user.url} alt={user.first_name} className="modal-img" />
                <h2>{user.first_name}, {user.age}</h2>
                <p><strong>About:</strong> {user.about}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Location:</strong> {user.location}</p>
                <p><strong>Wake Time:</strong> {user.wake_time}</p>
                <p><strong>Sleep Time:</strong> {user.sleep_time}</p>
                <p><strong>Interests:</strong> {user.interests?.join(', ')}</p>
            </div>
        </div>
    )
}

export default ProfileModal
    