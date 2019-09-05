import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { v4 } from 'uuid'
import * as bcrypt from 'bcryptjs'
import * as md5 from 'md5'
import * as csv from 'csv-parse'
import * as fs from 'fs'
import * as path from 'path'
import { Category, Condition } from '../entity/Item'

const dataPath = path.join(__dirname, '../../items.csv')

export class SeedData1567195870663 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<any> {
    return new Promise(async resolve => {
      const promises: Promise<any>[] = []

      const adminId = v4()
      const me = {
        id: adminId,
        name: 'Admin',
        email: 'benjaminadk@gmail.com',
        password: await bcrypt.hash('password', 10),
        image: `https://www.gravatar.com/avatar/${md5('benjaminadk@gmail.com')}?d=mp`,
        confirmed: true,
        forgotPasswordLocked: false
      }

      const test = {
        id: v4(),
        name: 'test',
        email: 'test@test.test',
        password: await bcrypt.hash('testtest', 10),
        image: `https://www.gravatar.com/avatar/${md5('test@test.test')}?d=mp`,
        confirmed: true,
        forgotPasswordLocked: false
      }

      await getRepository('users', 'development').save(me)
      await getRepository('users', 'development').save(test)
      await new Promise(r => setTimeout(r, 500))

      const data: string[] = []
      fs.createReadStream(dataPath)
        .pipe(csv({ delimiter: ',' }))
        .on('data', function(row: string) {
          data.push(row)
        })
        .on('end', async function() {
          for (const row of data.slice(1)) {
            const item = {
              id: v4(),
              name: row[0],
              description: row[1],
              category: Category[row[2] as any],
              condition: Condition[row[3] as any],
              price: Number(row[4]),
              images: row[5].split(','),
              location: row[6],
              latitude: Number(row[7]),
              longitude: Number(row[8]),
              userId: adminId
            }
            const itemPromise = getRepository('items', 'development').save(item)
            promises.push(itemPromise)
          }
          await Promise.all(promises)
          resolve()
        })
    })
  }

  public async down(_: QueryRunner): Promise<any> {}
}
