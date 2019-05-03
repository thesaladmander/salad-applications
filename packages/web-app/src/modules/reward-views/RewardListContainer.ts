import { connect } from '../../connect'
import { RewardList } from './components/RewardList'
import { RootStore } from '../../Store'

const mapStoreToProps = (store: RootStore) => ({
  rewards: store.rewards.filteredRewards,
  onRewardClick: store.rewards.viewReward,
})

export const RewardListContainer = connect(
  mapStoreToProps,
  RewardList,
)
