import { createMongoAbility, AbilityBuilder } from '@casl/ability'
const { build } = new AbilityBuilder(createMongoAbility)
export default build()
