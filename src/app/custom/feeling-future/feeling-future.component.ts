import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {FeelingFutureRequestModel} from './feeling-future-request.model';
import {FeelingFutureService} from './feeling-future.service';
import {FeelingFutureResponseModel} from './feeling-future-response.model';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'app-feeling-futur',
    templateUrl: './feeling-future.component.html',
    styleUrls: ['./feeling-future.component.scss']
})

export class FeelingFutureComponent implements OnInit {

    feelingFutureForm = this.fb.group({
        userPseudo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        userConsent: [null, Validators.required]
    });

    currentStatus = 'none';
    currentImageLeft = '';
    currentImageRight = '';

    constructor(private fb: FormBuilder, private feelingFutureService: FeelingFutureService) {
    }

    ngOnInit() {
    }

    onUserPredictLocation(predictedLocation: string) {
        const request = new FeelingFutureRequestModel(this.feelingFutureForm.get('userPseudo')!.value, predictedLocation);
        this.feelingFutureService.getResult(request)
            .subscribe((response: HttpResponse<FeelingFutureResponseModel>) => {
                    const currentResponse = response.body;
                    if (currentResponse != null) {
                        this.currentStatus = currentResponse.isSuccess + 'lol';
                        if (currentResponse.imageLocation === 'right') {
                            this.currentImageLeft = 'assets/img/theme/blank.jpg';
                            this.currentImageRight = currentResponse.imageURL;
                        } else {
                            this.currentImageLeft = currentResponse.imageURL;
                            this.currentImageRight = 'assets/img/theme/blank.jpg';
                        }
                    } else {
                        this.currentStatus = 'error';
                    }
                },
                () => (this.currentStatus = 'error'));
    }
}
