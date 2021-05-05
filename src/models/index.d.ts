import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class CUSTOMER3RDPARTY {
  readonly id: string;
  readonly Application: string;
  readonly ApplicationSync: boolean;
  readonly ApplicationRefreshToken?: string;
  readonly ApplicationTokenExpiryDate?: string;
  readonly ApplicationAccessToken?: string;
  readonly customer360dslID?: string;
  constructor(init: ModelInit<CUSTOMER3RDPARTY>);
  static copyOf(source: CUSTOMER3RDPARTY, mutator: (draft: MutableModel<CUSTOMER3RDPARTY>) => MutableModel<CUSTOMER3RDPARTY> | void): CUSTOMER3RDPARTY;
}

export declare class ACTIVITIESTP {
  readonly id: string;
  readonly TPActivityId: string;
  readonly TPActivityOwnerId: string;
  readonly TPActivityDescription: string;
  readonly TPActivityType: string;
  readonly TPActivityDate: string;
  readonly TPActivityMovingTime: number;
  readonly TPActivityDistance: number;
  readonly TPActivityAverageHeartRate?: number;
  readonly TPActivityTSS?: number;
  readonly TPActivityCalories?: number;
  readonly TPActivityElevationGain?: number;
  readonly TPActivityAverageSpeed?: number;
  readonly TPActivityAverageCadence?: number;
  readonly TPActivityAverageTemp?: number;
  readonly ACTIVITIES360DSL?: ACTIVITIES360DSL;
  readonly TPActivityLocation?: string;
  readonly TPActivity?: string;
  constructor(init: ModelInit<ACTIVITIESTP>);
  static copyOf(source: ACTIVITIESTP, mutator: (draft: MutableModel<ACTIVITIESTP>) => MutableModel<ACTIVITIESTP> | void): ACTIVITIESTP;
}

export declare class ACTIVITIES360DSL {
  readonly id: string;
  readonly ActivityDescription: string;
  readonly ActivityType: string;
  readonly ActivityDate: string;
  readonly ActivityMovingTime: number;
  readonly ActivityDistance: number;
  readonly ACTIVITIES360DSLCUSTOMER360DSLS?: (ACTIVITIES360DSLCUSTOMER360DSL | null)[];
  readonly ACTIVITIESSTRAVA?: ACTIVITIESSTRAVA;
  readonly ActivityAverageHeartRate?: number;
  readonly ActivityStressScore?: number;
  readonly ActivityCalories?: number;
  readonly ActivityElevationGain?: number;
  readonly ActivityAverageSpeed?: number;
  readonly ActivityAverageCadence?: number;
  readonly ActivityAverageTemp?: number;
  readonly ActivityLocation?: string;
  readonly ActivityRPE?: number;
  readonly ActivityFatigueLevel?: string;
  readonly ActivityPhysicalLevel?: string;
  constructor(init: ModelInit<ACTIVITIES360DSL>);
  static copyOf(source: ACTIVITIES360DSL, mutator: (draft: MutableModel<ACTIVITIES360DSL>) => MutableModel<ACTIVITIES360DSL> | void): ACTIVITIES360DSL;
}

export declare class ACTIVITIES360DSLCUSTOMER360DSL {
  readonly id: string;
  readonly activities360dsl: ACTIVITIES360DSL;
  readonly customer360dsl: CUSTOMER360DSL;
  constructor(init: ModelInit<ACTIVITIES360DSLCUSTOMER360DSL>);
  static copyOf(source: ACTIVITIES360DSLCUSTOMER360DSL, mutator: (draft: MutableModel<ACTIVITIES360DSLCUSTOMER360DSL>) => MutableModel<ACTIVITIES360DSLCUSTOMER360DSL> | void): ACTIVITIES360DSLCUSTOMER360DSL;
}

export declare class CUSTOMER360DSL {
  readonly id: string;
  readonly LastName: string;
  readonly FirstName: string;
  readonly EmailAddress: string;
  readonly MobileNumber: string;
  readonly Gender: boolean;
  readonly DateOfBirth: string;
  readonly Country?: string;
  readonly activities360dsls?: (ACTIVITIES360DSLCUSTOMER360DSL | null)[];
  readonly CUSTOMER3RDPARTIES?: (CUSTOMER3RDPARTY | null)[];
  constructor(init: ModelInit<CUSTOMER360DSL>);
  static copyOf(source: CUSTOMER360DSL, mutator: (draft: MutableModel<CUSTOMER360DSL>) => MutableModel<CUSTOMER360DSL> | void): CUSTOMER360DSL;
}

export declare class ACTIVITIESSTRAVA {
  readonly id: string;
  readonly StravaActivityId: string;
  readonly StravaActivityOwnerId: string;
  readonly StravaActivityDescription: string;
  readonly StravaActivityType: string;
  readonly StravaActivityDate: string;
  readonly StravaActivityMovingTime: number;
  readonly StravaActivityDistance: number;
  readonly StravaActivityAverageHeartRate?: number;
  readonly StravaActivitySufferScore?: number;
  readonly StravaActivityCalories?: number;
  readonly StravaActivityElevationGain?: number;
  readonly StravaActivityAverageSpeed?: number;
  readonly StravaActivityAverageCadence?: number;
  readonly StravaActivityAvergeTemp?: number;
  readonly StravaActivityLocation?: string;
  readonly StravaActivity?: string;
  constructor(init: ModelInit<ACTIVITIESSTRAVA>);
  static copyOf(source: ACTIVITIESSTRAVA, mutator: (draft: MutableModel<ACTIVITIESSTRAVA>) => MutableModel<ACTIVITIESSTRAVA> | void): ACTIVITIESSTRAVA;
}