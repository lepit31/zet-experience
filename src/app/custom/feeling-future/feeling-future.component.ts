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
    currentImageLeft = 'assets/img/theme/curtain.jpg';
    currentImageRight = 'assets/img/theme/curtain.jpg';

    isWaiting = false;

    constructor(private fb: FormBuilder, private feelingFutureService: FeelingFutureService) {
    }

    ngOnInit() {
    }

    onResetWaiting() {
        this.currentImageLeft = 'assets/img/theme/curtain.jpg';
        this.currentImageRight = 'assets/img/theme/curtain.jpg';
        this.isWaiting = false;
    }

    onUserPredictLocation(predictedLocation: string) {
        this.isWaiting = true;
        const request = new FeelingFutureRequestModel(this.feelingFutureForm.get('userPseudo')!.value, predictedLocation);
        this.feelingFutureService.sendPrediction(request)
            .subscribe((response: HttpResponse<FeelingFutureResponseModel>) => {
                    const currentResponse = response.body;
                    if (currentResponse != null) {

                        const currentImageUrl = currentResponse.isSuccess ? 'assets/img/oasis/' + currentResponse.imageURL : 'assets/img/theme/blank.jpg';
                        this.currentStatus = currentResponse.isSuccess ? 'success' : 'fail';

                        if (currentResponse.userPrediction === 'right') {
                            this.currentImageLeft = 'assets/img/theme/curtain.jpg';
                            this.currentImageRight = currentImageUrl;
                        } else {
                            this.currentImageRight = 'assets/img/theme/curtain.jpg';
                            this.currentImageLeft = currentImageUrl;
                        }
                    } else {
                        this.currentStatus = 'error';
                    }
                },
                () => (this.currentStatus = 'error'));
    }
}
