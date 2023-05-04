import { FormControl, FormGroup } from "@angular/forms";

export const getPeriodicElementForm = () => {
    return new FormGroup({
        owner_name: new FormControl(),
        image_url: new FormControl(),
        _id: new FormControl(),
        name: new FormControl(),
        category_id: new FormControl(),
        price: new FormControl(),
        __v: new FormControl(),
        description: new FormControl(),
    });
} 