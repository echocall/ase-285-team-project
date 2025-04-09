import { useState } from 'react';
import '../../css/styles.css';

const AddMenuItemForm = () => {
    const [inputs, setInputs] = useState({
        itemName: '',
        ingredients: '',
        description: ''
    });
    const [selectedIds, setSelectedIds] = useState([]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (event) => {
        const id = event.target.value;
        if (event.target.checked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(existingId => existingId !== id));
        }
    };

    const [allergens] = useState([
        { allergenID: "1", name: "Peanut" },
        { allergenID: "2", name: "Gluten" },
        { allergenID: "3", name: "Eggs" },
        { allergenID: "4", name: "Dairy" },
    ]);

    return (
        <div className="flex-container">
            <form>
                <div className="left-side">
                    <div name="nameInput">
                        <h3 className="title">Name:</h3>
                        <input 
                            type="text" 
                            id="itemName" 
                            name="itemName"
                            value={inputs.itemName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div name="ingredientsInput">
                        <h3 className="title">Ingredients</h3>
                        <textarea 
                            id="ingredients" 
                            name="ingredients" 
                            rows="4" 
                            cols="50"
                            value={inputs.ingredients}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="descriptionInput">
                        <h3 className="title">Description</h3>
                        <textarea 
                            id="description" 
                            name="description" 
                            rows="4" 
                            cols="50"
                            value={inputs.description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="right-side">
                    <h3>This Item Contains the Following Allergens:</h3>
                    <div className="display-allergens">
                        <p>Selected IDs: {selectedIds.join(', ')}</p>
                    </div>
                    <div className="allergen-add">
                        {allergens.map((allergen) => (
                            <div key={allergen.allergenID}>
                                <input
                                    type="checkbox"
                                    id={allergen.allergenID}
                                    className="allergen-checkbox"
                                    value={allergen.allergenID}
                                    checked={selectedIds.includes(allergen.allergenID)}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor={allergen.allergenID}>{allergen.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="button">+ Add Another</button>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default AddMenuItemForm;
