export interface Location {
  name: string;
  streetAddress: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface Band {
  name: string;
}

export interface Artist {
  name: string;
  band: Band;
}

export interface Concert {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  maxTickets: number;
  minimumAge: number;
  artists: Artist[];
  location: Location;
}
