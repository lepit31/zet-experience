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
        userConsent: [null, Validators.requiredTrue]
    });

    currentStatus = 'none';
    currentImageLeft = 'assets/img/theme/curtain.jpg';
    currentImageRight = 'assets/img/theme/curtain.jpg';

    isWaiting = false;

    nbImage = 0;
    nbImageSuccess = 0;
    nbLeft = 0;
    nbLeftSuccess = 0;
    nbRight = 0;
    nbRightSuccess = 0;
    nbErotic = 0;
    nbEroticSuccess = 0;
    nbNonErotic = 0;
    nbNonEroticSuccess = 0;

    constructor(private fb: FormBuilder, private feelingFutureService: FeelingFutureService) {
    }

    ngOnInit() {
    }

    onResetWaiting() {
        this.currentImageLeft = 'assets/img/theme/curtain.jpg';
        this.currentImageRight = 'assets/img/theme/curtain.jpg';
        this.isWaiting = false;
        this.currentStatus = 'none';
    }

    onUserPredictLocation(predictedLocation: string) {
        this.isWaiting = true;
        this.currentStatus = 'waiting';
        const request = new FeelingFutureRequestModel(this.feelingFutureForm.get('userPseudo')!.value, predictedLocation);
        this.feelingFutureService.sendPrediction(request)
            .subscribe((response: HttpResponse<FeelingFutureResponseModel>) => {
                    const currentResponse = response.body;
                    if (currentResponse != null) {
                        //display response
                        const currentImageUrl = currentResponse.isSuccess ? 'assets/img/oasis/' + currentResponse.imageURL : 'assets/img/theme/blank.jpg';

                        if (currentResponse.userPrediction === 'right') {
                            this.currentImageLeft = 'assets/img/theme/curtain.jpg';
                            this.currentImageRight = currentImageUrl;

                        } else {
                            this.currentImageRight = 'assets/img/theme/curtain.jpg';
                            this.currentImageLeft = currentImageUrl;

                        }

                        this.currentStatus = currentResponse.isSuccess ? 'success' : 'fail';

                        // calc user stat

                        this.nbImage++;
                        if (currentResponse.isSuccess) {
                            this.nbImageSuccess++;
                        }

                        if (currentResponse.imageType === 'erotic') {
                            this.nbErotic++;
                            if (currentResponse.isSuccess) {
                                this.nbEroticSuccess++;
                            }
                        } else {
                            this.nbNonErotic++;
                            if (currentResponse.isSuccess) {
                                this.nbNonEroticSuccess++;
                            }
                        }

                        if (currentResponse.imageLocation === 'right') {
                            this.nbRight++;
                            if (currentResponse.isSuccess) {
                                this.nbRightSuccess++;
                            }
                        } else {
                            this.nbLeft++;
                            if (currentResponse.isSuccess) {
                                this.nbLeftSuccess++;
                            }
                        }


                    } else {
                        this.currentStatus = 'error';
                    }
                },
                () => (this.currentStatus = 'error'));
    }
}
