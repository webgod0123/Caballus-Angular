export enum State {
    Alabama = 'AL',
    Alaska = 'AK',
    Arizona = 'AZ',
    Arkansas = 'AR',
    California = 'CA',
    Colorado = 'CO',
    Connecticut = 'CT',
    Delaware = 'DE',
    Florida = 'FL',
    Georgia = 'GA',
    Hawaii = 'HI',
    Idaho = 'ID',
    Illinois = 'IL',
    Indiana = 'IN',
    Iowa = 'IA',
    Kansas = 'KS',
    Kentucky = 'KY',
    Louisiana = 'LA',
    Maine = 'ME',
    Maryland = 'MD',
    Massachusetts = 'MA',
    Michigan = 'MI',
    Minnesota = 'MN',
    Mississippi = 'MS',
    Missouri = 'MO',
    Montana = 'MT',
    Nebraska = 'NE',
    Nevada = 'NV',
    NewHampshire = 'NH',
    NewJersey = 'NJ',
    NewMexico = 'NM',
    NewYork = 'NY',
    NorthCarolina = 'NC',
    NorthDakota = 'ND',
    Ohio = 'OH',
    Oklahoma = 'OK',
    Oregon = 'OR',
    Pennsylvania = 'PA',
    RhodeIsland = 'RI',
    SouthCarolina = 'SC',
    SouthDakota = 'SD',
    Tennessee = 'TN',
    Texas = 'TX',
    Utah = 'UT',
    Vermont = 'VT',
    Virginia = 'VA',
    Washington = 'WA',
    WestVirginia = 'WV',
    Wisconsin = 'WI',
    Wyoming = 'WY'
}

export namespace State {
    /**
     * Contains an ordered array of the valid State members
     */
    export const members: State[] = [
        State.Alabama,
        State.Alaska,
        State.Arizona,
        State.Arkansas,
        State.California,
        State.Colorado,
        State.Connecticut,
        State.Delaware,
        State.Florida,
        State.Georgia,
        State.Hawaii,
        State.Idaho,
        State.Illinois,
        State.Indiana,
        State.Iowa,
        State.Kansas,
        State.Kentucky,
        State.Louisiana,
        State.Maine,
        State.Maryland,
        State.Massachusetts,
        State.Michigan,
        State.Minnesota,
        State.Mississippi,
        State.Missouri,
        State.Montana,
        State.Nebraska,
        State.Nevada,
        State.NewHampshire,
        State.NewJersey,
        State.NewMexico,
        State.NewYork,
        State.NorthCarolina,
        State.NorthDakota,
        State.Ohio,
        State.Oklahoma,
        State.Oregon,
        State.Pennsylvania,
        State.RhodeIsland,
        State.SouthCarolina,
        State.SouthDakota,
        State.Tennessee,
        State.Texas,
        State.Utah,
        State.Vermont,
        State.Virginia,
        State.Washington,
        State.WestVirginia,
        State.Wisconsin,
        State.Wyoming
    ];

    /**
     * Converts a State enum value to readable string
     *
     * @param state State value to convert
     * @returns string representation of enum value
     */
    export function toString(state: State): string {
        switch (state) {
            case State.Alabama:
                return 'Alabama';
            case State.Alaska:
                return 'Alaska';
            case State.Arizona:
                return 'Arizona';
            case State.Arkansas:
                return 'Arkansas';
            case State.California:
                return 'California';
            case State.Colorado:
                return 'Colorado';
            case State.Connecticut:
                return 'Connecticut';
            case State.Delaware:
                return 'Delaware';
            case State.Florida:
                return 'Florida';
            case State.Georgia:
                return 'Georgia';
            case State.Hawaii:
                return 'Hawaii';
            case State.Idaho:
                return 'Idaho';
            case State.Illinois:
                return 'Illinois';
            case State.Indiana:
                return 'Indiana';
            case State.Iowa:
                return 'Iowa';
            case State.Kansas:
                return 'Kansas';
            case State.Kentucky:
                return 'Kentucky';
            case State.Louisiana:
                return 'Louisiana';
            case State.Maine:
                return 'Maine';
            case State.Maryland:
                return 'Maryland';
            case State.Massachusetts:
                return 'Massachusetts';
            case State.Michigan:
                return 'Michigan';
            case State.Minnesota:
                return 'Minnesota';
            case State.Mississippi:
                return 'Mississippi';
            case State.Missouri:
                return 'Missouri';
            case State.Montana:
                return 'Montana';
            case State.Nebraska:
                return 'Nebraska';
            case State.Nevada:
                return 'Nevada';
            case State.NewHampshire:
                return 'New Hampshire';
            case State.NewJersey:
                return 'New Jersey';
            case State.NewMexico:
                return 'New Mexico';
            case State.NewYork:
                return 'New York';
            case State.NorthCarolina:
                return 'North Carolina';
            case State.NorthDakota:
                return 'North Dakota';
            case State.Ohio:
                return 'Ohio';
            case State.Oklahoma:
                return 'Oklahoma';
            case State.Oregon:
                return 'Oregon';
            case State.Pennsylvania:
                return 'Pennsylvania';
            case State.RhodeIsland:
                return 'Rhode Island';
            case State.SouthCarolina:
                return 'South Carolina';
            case State.SouthDakota:
                return 'South Dakota';
            case State.Tennessee:
                return 'Tennessee';
            case State.Texas:
                return 'Texas';
            case State.Utah:
                return 'Utah';
            case State.Vermont:
                return 'Vermont';
            case State.Virginia:
                return 'Virginia';
            case State.Washington:
                return 'Washington';
            case State.WestVirginia:
                return 'West Virginia';
            case State.Wisconsin:
                return 'Wisconsin';
            case State.Wyoming:
                return 'Wyoming';
            default:
                return '';
        }
    }
}
