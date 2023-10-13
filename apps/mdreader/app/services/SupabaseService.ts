import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

type FilterOperator =
  | 'cs'
  | 'eq'
  | 'gt'
  | 'gte'
  | 'ilike'
  | 'in'
  | 'is'
  | 'like'
  | 'lt'
  | 'lte'
  | 'neq';

export interface SupabaseServiceConstructor {
  table: string;
  supabase: SupabaseClient;
}

export default class SupabaseService<ObjectResponse, ObjectEntry> {
  private table: string;
  protected supabase: SupabaseClient;

  constructor(props: SupabaseServiceConstructor) {
    this.table = props.table;
    this.supabase = props.supabase;
  }

  private throwableResponse(response: PostgrestSingleResponse<any>) {
    if (response.error) {
      throw new Error(response.error.message);
    }

    return { ...response, data: response.data as ObjectResponse[] };
  }

  public async getAll({
    filters,
    order,
    select = '*',
  }: {
    filters?: {
      active?: boolean;
      property: string;
      operator: FilterOperator;
      value: any;
    }[];
    order?: {
      property: string;
      ascending: boolean;
    };
    select?: string;
  } = {}) {
    const builder = this.supabase.from(this.table).select('*');

    if (filters) {
      for (const filter of filters) {
        const filterActive = filter?.active ?? true;

        if (filterActive) {
          builder.filter(filter.property, filter.operator, filter.value);
        }
      }
    }

    if (order) {
      builder.order(order.property, { ascending: order.ascending ?? true });
    }

    const response = await builder.select(select);

    return this.throwableResponse(response);
  }

  public async getOne(
    props: {
      filters?: {
        property: string;
        operator: FilterOperator;
        value: any;
      }[];
      order?: {
        property: string;
        ascending: boolean;
      };
      select?: string;
    } = {}
  ) {
    const response = await this.getAll(props);

    const throwableResponse = this.throwableResponse(response);

    return throwableResponse.data[0];
  }

  public async upsert(objectEntry: ObjectEntry) {
    return this.throwableResponse(
      await this.supabase.from(this.table).upsert(objectEntry).select()
    );
  }

  public async remove(id: number) {
    return this.throwableResponse(
      await this.supabase.from(this.table).delete().eq('id', id).select()
    );
  }
}
