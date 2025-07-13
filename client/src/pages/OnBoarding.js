import Nav from '../components/Nav'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const OnBoarding = () => {
    const [cookies] = useCookies(null)
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        gender_identity: "man",
        gender_interest: "man", // auto-set to same gender
        show_gender: false,
        occupation: "",
        budget: "",
        cleanliness_level: "",
        sleep_schedule: "",
        food_preference: "",
        pet_friendly: false,
        location_preference: "",
        url: "",
        about: "",
        matches: []
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8002/user', { formData })
            if (response.status === 200) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => {
            if (name === 'gender_identity') {
                return {
                    ...prevState,
                    gender_identity: value,
                    gender_interest: value // auto-set same gender
                }
            }

            return {
                ...prevState,
                [name]: value
            }
        })
    }

    return (
        <>
            <Nav minimal={true} showModal={false} setShowModal={() => {}} />

            <div className="onboarding">
                <h2>Create Roommate Profile</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">Full Name</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            required
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input type="number" name="dob_day" placeholder="DD" required value={formData.dob_day} onChange={handleChange} />
                            <input type="number" name="dob_month" placeholder="MM" required value={formData.dob_month} onChange={handleChange} />
                            <input type="number" name="dob_year" placeholder="YYYY" required value={formData.dob_year} onChange={handleChange} />
                        </div>

                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input type="radio" id="man" name="gender_identity" value="man" checked={formData.gender_identity === "man"} onChange={handleChange} />
                            <label htmlFor="man">Man</label>
                            <input type="radio" id="woman" name="gender_identity" value="woman" checked={formData.gender_identity === "woman"} onChange={handleChange} />
                            <label htmlFor="woman">Woman</label>
                            <input type="radio" id="more" name="gender_identity" value="more" checked={formData.gender_identity === "more"} onChange={handleChange} />
                            <label htmlFor="more">More</label>
                        </div>

                        <label htmlFor="show_gender">Show Gender on Profile</label>
                        <input type="checkbox" name="show_gender" id="show_gender" checked={formData.show_gender} onChange={handleChange} />

                        <label htmlFor="occupation">Occupation</label>
                        <input type="text" name="occupation" required value={formData.occupation} onChange={handleChange} />

                        <label htmlFor="budget">Monthly Budget (₹)</label>
                        <input type="number" name="budget" required value={formData.budget} onChange={handleChange} />

                        <label>Cleanliness Level</label>
                        <div className="multiple-input-container">
                            <input type="radio" id="neat" name="cleanliness_level" value="Neat" checked={formData.cleanliness_level === "Neat"} onChange={handleChange} />
                            <label htmlFor="neat">Neat</label>
                            <input type="radio" id="moderate" name="cleanliness_level" value="Moderate" checked={formData.cleanliness_level === "Moderate"} onChange={handleChange} />
                            <label htmlFor="moderate">Moderate</label>
                            <input type="radio" id="messy" name="cleanliness_level" value="Messy" checked={formData.cleanliness_level === "Messy"} onChange={handleChange} />
                            <label htmlFor="messy">Messy</label>
                        </div>

                        <label>Sleep Schedule</label>
                        <div className="multiple-input-container">
                            <input type="radio" id="morning" name="sleep_schedule" value="Morning" checked={formData.sleep_schedule === "Morning"} onChange={handleChange} />
                            <label htmlFor="morning">Morning</label>
                            <input type="radio" id="night" name="sleep_schedule" value="Night" checked={formData.sleep_schedule === "Night"} onChange={handleChange} />
                            <label htmlFor="night">Night</label>
                        </div>

                        <label htmlFor="food_preference">Food Preference</label>
                        <select name="food_preference" required value={formData.food_preference} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                            <option value="Eggetarian">Eggetarian</option>
                        </select>

                        <label htmlFor="pet_friendly">Pet Friendly</label>
                        <input type="checkbox" name="pet_friendly" id="pet_friendly" checked={formData.pet_friendly} onChange={handleChange} />

                        <label htmlFor="location_preference">Preferred Location</label>
                        <input type="text" name="location_preference" required value={formData.location_preference} onChange={handleChange} />

                        <label htmlFor="about">About Me</label>
                        <input type="text" name="about" required value={formData.about} onChange={handleChange} placeholder="Tell us a bit about yourself..." />

                        <input type="submit" value="Save Profile" />
                    </section>

                    <section>
                        <label htmlFor="url">Profile Photo URL</label>
                        <input type="url" name="url" id="url" required value={formData.url} onChange={handleChange} />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile preview" />}
                        </div>
                    </section>
                </form>
            </div>
        </>
    )
}

export default OnBoarding
