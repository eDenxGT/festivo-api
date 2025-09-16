// Base mapper interface (used to map datas)
export interface IBaseMapper<E, IDto, ODto> {
  // From API input -> domain
  toDomainFromInput?(dto: IDto): E;

  // From DB -> domain
  toDomainFromDB?(dbObject: any): E;

  // From domain -> API output
  toDTO?(entity: E): ODto;
}
