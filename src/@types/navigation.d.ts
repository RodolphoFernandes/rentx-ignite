import { MarkedDateProps } from "../components/Calendar"
import { CarDTO } from "../dtos/CarDTO"

export declare global {
    namespace ReactNavigation {
        interface RootParamList {            
            home : undefined
            carDetails: { car: CarDTO }
            scheduling: { car: CarDTO }
            schedulingDetails: {
                car: CarDTO,
                dates: any
            }
            schedulingComplete: undefined,
            myCars: undefined
        }
    }
}