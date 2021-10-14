import { Collection, Db, MongoClient } from 'mongodb'

export interface DataSource {
  initialize(): Promise<void>;
  dataSource( collectionName: string ): Collection;
  close(): void;
}

export class MongodbDataSource implements DataSource {
  private readonly uri: string;
  private readonly dbName: string;
  private mongoClient: MongoClient;
  private db: Db;

  constructor( uri: string, dbName: string ) {
    this.uri = uri
    this.dbName = dbName
  }

  public async initialize(): Promise<void> {
    this.mongoClient = await MongoClient.connect( this.uri )
    this.db = this.mongoClient.db( this.dbName )
  }

  public dataSource( collectionName: string ): Collection {
    if ( ! this.db ) {
      throw Error( 'Please initialize data source first' )
    }
    return this.db.collection( collectionName )
  }

  public async close(): Promise<void> {
    if ( this.mongoClient ) {
      await this.mongoClient.close( true )
    }
  }
}