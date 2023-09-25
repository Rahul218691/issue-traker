import React, { useMemo } from 'react'
import styles from './avatar.module.css'

const AvatarGroups = ({
  data = [],
  totalAssignee
}) => {

  const { isShowMoreAssignee, count } = useMemo(() => {
    const result = Number(totalAssignee) - Number(data?.length)
    return {
      isShowMoreAssignee: result > 0,
      count: result
    }
  }, [totalAssignee, data])

  return (
    <div className={styles.avatars}>
        {
          data.map((user) => (
            <img key={user._id} className={styles.avatars__item} src={user.profile} title={user.username} crossOrigin='Anonymous' alt="" />
          ))
        }
        {
          isShowMoreAssignee && (
              <span className={styles.more_users}>+{count} more</span>
          )
        }
    </div>
  )
}

export default AvatarGroups