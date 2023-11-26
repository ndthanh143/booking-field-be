import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { Repository } from 'typeorm';
import { GetRoundsQuery } from './dto/query.dto';
import { Round } from './entities/round.entity';

@Injectable()
export class RoundService extends BaseService<Round, unknown> {
  constructor(@InjectRepository(Round) private readonly roundRepository: Repository<Round>) {
    super(roundRepository);
  }

  findAllRound(query: GetRoundsQuery) {
    const { tournamentId } = query;
    return this.findAndCount(query, {
      where: {
        ...(tournamentId && {
          tournament: {
            id: tournamentId,
          },
        }),
      },
    });
  }

  findById(id: number) {
    return this.findOne({ where: { id } });
  }
}
