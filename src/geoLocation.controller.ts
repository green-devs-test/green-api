import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { GeoLocationService } from './geoLocation.service';
import { ISpot } from './data/spots';

@Controller('locations')
export class LocationsController {
  constructor(private readonly geoLocationsService: GeoLocationService) {}

  @Get()
  getProvinces(): string[] {
    return this.geoLocationsService.getProvinces();
  }

  @Get(':province')
  getLocations(@Param('province') province: string): string[] {
    const location = this.geoLocationsService.getLocations(province.toLowerCase());
    if (!location) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    return location;
  }

  @Get(':province/:location')
  getSpots(@Param('province') province: string, @Param('location') location: string): ISpot[] {
    return this.geoLocationsService.getSpots(province.toLowerCase(), location.toLowerCase());
  }
}