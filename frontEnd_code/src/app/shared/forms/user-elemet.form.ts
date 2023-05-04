import { FormControl, FormGroup } from "@angular/forms";

export const getPeriodicElementFormUser = () => {
    return new FormGroup({
        _id: new FormControl(),
        username: new FormControl(),
        password: new FormControl(),
        email: new FormControl(),
        accessLevel: new FormControl(),
    });
} 