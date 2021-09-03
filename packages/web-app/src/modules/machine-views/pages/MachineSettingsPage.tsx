import { Button, SvgIcon, Text } from '@saladtechnologies/garden-components'
import { Check } from '@saladtechnologies/garden-icons'
import classnames from 'classnames'
import Scrollbars from 'react-custom-scrollbars'
import withStyles, { WithStyles } from 'react-jss'
import { Head } from '../../../components'
import type { SaladTheme } from '../../../SaladTheme'
import { MachineSettingsBox } from './components/MachineSettingsBox'

const styles = (theme: SaladTheme) => ({
  container: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    backgroundImage: 'linear-gradient(to right, #56A431 , #AACF40)',
    display: 'flex',
    height: '100vh',
    position: 'relative',
    zIndex: 1,
  },
  contentContainer: {
    maxWidth: 1280,
    margin: '0 auto',
    marginTop: 96,
    paddingBottom: 50,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  settings: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  hr: {
    borderTop: `solid 1px ${theme.lightGreen}`,
  },
  mb24: {
    marginBottom: 24,
  },
  mt24: {
    marginTop: 24,
  },
  mt64: {
    marginTop: 64,
  },
  table: {
    marginTop: 24,
    width: '100%',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 65,
  },
  tableHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  tableItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  tableRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 36,
  },
  whiteFontColor: {
    color: '#FFF',
  },
})

export interface MachineInfo {
  processor: {
    name: string
    temperature: string
    percentageUtilized: number
  }
  miner: {
    name?: string
    version?: string
    algorithm?: string
  }
}

export interface MachineSettingsPageProps extends WithStyles<typeof styles> {
  onDisableWindowsDefender: () => void
  onDisableSleepMode: () => void
  closeToTrayEnabled: boolean
  onToggleCloseToTray: (value: boolean) => void
  autoStartEnabled: boolean
  onToggleAutoStart: (value: boolean) => void
  autoLaunchEnabled: boolean
  onToggleAutoLaunch: (value: boolean) => void
  cpuMiningEnabled: boolean
  gpuMiningEnabled: boolean
  onSetCPUMiningOnly: () => void
  onSetGPUMiningOnly: () => void
  onSetGPUAndCPUMining: () => void
  cpuInfo?: MachineInfo
  gpuInfo?: MachineInfo
  machineName: string
  onShowLogFolder: () => void
}

const _MachineSettingsPage = ({
  classes,
  onDisableWindowsDefender,
  onDisableSleepMode,
  closeToTrayEnabled,
  onToggleCloseToTray,
  autoStartEnabled,
  onToggleAutoStart,
  autoLaunchEnabled,
  onToggleAutoLaunch,
  cpuInfo,
  gpuInfo,
  onShowLogFolder,
  cpuMiningEnabled,
  gpuMiningEnabled,
  onSetCPUMiningOnly,
  onSetGPUMiningOnly,
  onSetGPUAndCPUMining,
}: MachineSettingsPageProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.page}>
        <Scrollbars>
          <div className={classes.contentContainer}>
            <Head title="Machine Settings" />
            <Text variant="headline">
              <span className={classes.whiteFontColor}>Machine Settings</span>
            </Text>
            <div className={classes.tableContainer}>
              <div className={classes.tableHeader}>
                <Text variant="baseXXL">Machine Name</Text>
                <Button variant="outlined" size="small" label="Show Log Folder" onClick={onShowLogFolder} />
              </div>
              {gpuInfo && (
                <div className={classes.table}>
                  <hr className={classnames(classes.hr, classes.mb24 ?? '-')} />
                  <div className={classes.tableRow}>
                    <div className={classes.tableItem}>
                      <Text variant="baseL">GPU</Text>
                      <Text variant="baseXXL">{gpuInfo.processor.name ?? '-'}</Text>
                    </div>
                    <div className={classes.tableItem}>
                      <Text variant="baseL">Temperature</Text>
                      <Text variant="baseXXL">{gpuInfo.processor.temperature ?? '-'}</Text>
                    </div>
                    <div className={classes.tableItem}>
                      <Text variant="baseL">% Utilized</Text>
                      <Text variant="baseXXL">{gpuInfo.processor.percentageUtilized ?? '-'}</Text>
                    </div>
                  </div>
                  <div className={classes.tableRow}>
                    <div className={classes.tableItem}>
                      <Text variant="baseL">Miner Name</Text>
                      <Text variant="baseXXL">{gpuInfo.miner.name ?? '-'}</Text>
                    </div>
                    <div className={classes.tableItem}>
                      <Text variant="baseL">Miner Version</Text>
                      <Text variant="baseXXL">{gpuInfo.miner.version ?? '-'}</Text>
                    </div>
                    <div className={classes.tableItem}>
                      <Text variant="baseL">Algorithm</Text>
                      <Text variant="baseXXL">{gpuInfo.miner.algorithm ?? '-'}</Text>
                    </div>
                  </div>
                  <hr className={classes.hr} />
                </div>
              )}
              {cpuInfo && (
                <div className={classes.table}>
                  <div className={classes.mb24} />
                  <div className={classes.tableRow}>
                    <div className={classes.tableItem}>
                      <Text variant="baseL">CPU</Text>
                      <Text variant="baseXXL">{cpuInfo.processor.name ?? '-'}</Text>
                    </div>
                    <div className={classes.tableItem}>
                      <Text variant="baseL">Temperature</Text>
                      <Text variant="baseXXL">{cpuInfo.processor.temperature ?? '-'}</Text>
                    </div>
                    <div className={classes.tableItem}>
                      <Text variant="baseL">% Utilized</Text>
                      <Text variant="baseXXL">{cpuInfo.processor.percentageUtilized ?? '-'}</Text>
                    </div>
                  </div>
                  <div className={classes.tableRow}>
                    <div className={classes.tableItem}>
                      <Text variant="baseL">Miner Name</Text>
                      <Text variant="baseXXL">{cpuInfo.miner.name ?? '-'}</Text>
                    </div>
                    <div className={classes.tableItem}>
                      <Text variant="baseL">Miner Version</Text>
                      <Text variant="baseXXL">{cpuInfo.miner.version ?? '-'}</Text>
                    </div>
                    <div className={classes.tableItem}>
                      <Text variant="baseL">Algorithm</Text>
                      <Text variant="baseXXL">{cpuInfo.miner.algorithm ?? '-'}</Text>
                    </div>
                  </div>
                  <hr className={classes.hr} />
                </div>
              )}
            </div>
            <div className={classes.settings}>
              <div className={classes.column}>
                <div className={classes.mt64}>
                  <MachineSettingsBox
                    title="Mining Type"
                    buttons={
                      <MiningTypeButtons
                        cpuMiningEnabled={cpuMiningEnabled}
                        gpuMiningEnabled={gpuMiningEnabled}
                        onSetCPUMiningOnly={onSetCPUMiningOnly}
                        onSetGPUMiningOnly={onSetGPUMiningOnly}
                        onSetGPUAndCPUMining={onSetGPUAndCPUMining}
                      />
                    }
                  >
                    <Text variant="baseL">Mining Disclaimers:</Text>
                    <Text variant="baseL">
                      <ul>
                        <li>Background processes will significantly affect earning rates. Use while AFK.</li>
                        <li>Earning rates may vary widely from machine to machine</li>
                        <li>Proper cooling and maintenance is vital for performance and safety</li>
                        <li>Does GPU Mining Harm My Computer?</li>
                      </ul>
                    </Text>
                    <Text variant="baseS">Having Antivirus Issues? Open Antivirus Guides</Text>
                  </MachineSettingsBox>
                </div>
                <div className={classes.mt64}>
                  <MachineSettingsBox
                    title="Close to Tray"
                    buttons={<ToggleButtons isEnabled={closeToTrayEnabled} onToggle={onToggleCloseToTray} />}
                  >
                    <Text variant="baseL">
                      Salad always tries to fully utilize your PC to get you the highest earnings possible and is
                      designed to be run when you are away from your machine (AFK).
                    </Text>
                    <div className={classes.mt24}>
                      <Text variant="baseS">Automatically chop when you are away from your PC</Text>
                    </div>
                  </MachineSettingsBox>
                </div>
              </div>
              <div className={classes.column}>
                <div className={classes.mt64}>
                  <MachineSettingsBox
                    title="Auto Start"
                    buttons={<ToggleButtons isEnabled={autoStartEnabled} onToggle={onToggleAutoStart} />}
                  >
                    <Text variant="baseL">
                      Salad always tries to fully utilize your PC to get you the highest earnings possible and is
                      designed to be run when you are away from your machine (AFK).
                    </Text>
                    <div className={classes.mt24}>
                      <Text variant="baseS">Automatically chop when you are away from your PC</Text>
                    </div>
                  </MachineSettingsBox>
                </div>
                <div className={classes.mt64}>
                  <MachineSettingsBox
                    title="Windows Defender"
                    buttons={<SingleButton label="Disable" onClick={onDisableWindowsDefender} />}
                  >
                    <Text variant="baseL">
                      Salad always tries to fully utilize your PC to get you the highest earnings possible and is
                      designed to be run when you are away from your machine (AFK).
                    </Text>
                    <div className={classes.mt24}>
                      <Text variant="baseS">Automatically chop when you are away from your PC</Text>
                    </div>
                  </MachineSettingsBox>
                </div>
              </div>
              <div className={classes.column}>
                <div className={classes.mt64}>
                  <MachineSettingsBox
                    title="Auto Launch"
                    buttons={<ToggleButtons isEnabled={autoLaunchEnabled} onToggle={onToggleAutoLaunch} />}
                  >
                    <Text variant="baseL">
                      Salad always tries to fully utilize your PC to get you the highest earnings possible and is
                      designed to be run when you are away from your machine (AFK).
                    </Text>
                    <div className={classes.mt24}>
                      <Text variant="baseS">Automatically chop when you are away from your PC</Text>
                    </div>
                  </MachineSettingsBox>
                </div>
                <div className={classes.mt64}>
                  <MachineSettingsBox
                    title="Sleep Mode"
                    buttons={<SingleButton label="Disable" onClick={onDisableSleepMode} />}
                  >
                    <Text variant="baseL">
                      Salad always tries to fully utilize your PC to get you the highest earnings possible and is
                      designed to be run when you are away from your machine (AFK).
                    </Text>
                    <div className={classes.mt24}>
                      <Text variant="baseS">Automatically chop when you are away from your PC</Text>
                    </div>
                  </MachineSettingsBox>
                </div>
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export const MachineSettingsPage = withStyles(styles)(_MachineSettingsPage)

const CheckmarkIcon = () => (
  <SvgIcon size="medium" stroke="light">
    <Check />
  </SvgIcon>
)

interface MiningTypeButtonsProps {
  cpuMiningEnabled: boolean
  gpuMiningEnabled: boolean
  onSetCPUMiningOnly: () => void
  onSetGPUMiningOnly: () => void
  onSetGPUAndCPUMining: () => void
}

const MiningTypeButtons = ({
  cpuMiningEnabled,
  gpuMiningEnabled,
  onSetCPUMiningOnly,
  onSetGPUMiningOnly,
  onSetGPUAndCPUMining,
}: MiningTypeButtonsProps) => (
  <>
    <Button
      size="small"
      variant={gpuMiningEnabled && !cpuMiningEnabled ? 'primary-basic' : 'outlined'}
      leadingIcon={gpuMiningEnabled && !cpuMiningEnabled ? <CheckmarkIcon /> : undefined}
      label="GPU"
      onClick={onSetGPUMiningOnly}
    />
    <Button
      size="small"
      variant={cpuMiningEnabled && !gpuMiningEnabled ? 'primary-basic' : 'outlined'}
      leadingIcon={cpuMiningEnabled && !gpuMiningEnabled ? <CheckmarkIcon /> : undefined}
      label="CPU"
      onClick={onSetCPUMiningOnly}
    />
    <Button
      size="small"
      variant={gpuMiningEnabled && cpuMiningEnabled ? 'primary-basic' : 'outlined'}
      leadingIcon={gpuMiningEnabled && cpuMiningEnabled ? <CheckmarkIcon /> : undefined}
      label="GPU & CPU"
      onClick={onSetGPUAndCPUMining}
    />
  </>
)

interface ToggleButtonsProps {
  isEnabled: boolean
  onToggle: (value: boolean) => void
}

const ToggleButtons = ({ isEnabled, onToggle }: ToggleButtonsProps) => (
  <>
    <Button
      size="small"
      variant={isEnabled ? 'primary-basic' : 'outlined'}
      leadingIcon={isEnabled ? <CheckmarkIcon /> : undefined}
      label={isEnabled ? 'Enabled' : 'Enable'}
      onClick={() => onToggle(true)}
    />
    <Button
      size="small"
      variant={!isEnabled ? 'primary-basic' : 'outlined'}
      leadingIcon={!isEnabled ? <CheckmarkIcon /> : undefined}
      label={!isEnabled ? 'Disabled' : 'Disable'}
      onClick={() => onToggle(false)}
    />
  </>
)

interface SingleButtonProps {
  label: string
  onClick: () => void
}

const SingleButton = ({ onClick, label }: SingleButtonProps) => (
  <>
    <Button size="small" variant="primary-basic" label={label} onClick={onClick} />
  </>
)