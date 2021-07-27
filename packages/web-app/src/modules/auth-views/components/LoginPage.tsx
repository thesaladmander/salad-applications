import { FieldContainer, SvgIcon, SvgSecondaryLogoLockup, Text, TextField } from '@saladtechnologies/garden-components'
import { FormValues } from '@saladtechnologies/garden-components/lib/components/TextField/TextField'
import { Key, Mail } from '@saladtechnologies/garden-icons'
import classnames from 'classnames'
import { Component } from 'react'
import withStyles, { WithStyles } from 'react-jss'
import MediaQuery from 'react-responsive'
import { Checkbox, Head } from '../../../components'
import { SaladTheme } from '../../../SaladTheme'
import { FormSteps } from '../../auth/AuthStore'
import LoginPageRewards from '../assets/login-screen-rewards.png'

const styles = (theme: SaladTheme) => ({
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
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  content: {
    color: theme.darkBlue,
    marginTop: 96,
    maxWidth: 560,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    textAlign: 'left',
    padding: '0 15px',
  },
  header: {
    color: theme.lightGreen,
  },
  mb48: {
    marginBottom: 48,
  },
  mb24: {
    marginBottom: 24,
  },
  mb14: {
    marginBottom: 14,
  },
  link: {
    color: theme.darkBlue,
    cursor: 'pointer',
  },
  rewardImage: {
    display: 'flex',
    flex: 1,
    maxWidth: 560,
    height: 'auto',
    width: '100%',
  },
})

interface Props extends WithStyles<typeof styles> {
  currentStep?: FormSteps
  currentEmail?: string
  isSubmitting: boolean
  isSubmitSuccess: boolean
  acceptedTerms?: boolean
  errorMessage?: string
  onSubmitEmail?: (email: string) => void
  onSubmitCode?: (code: string) => void
  onBackToEmail?: () => void
  onCancelLogin?: () => void
  onToggleAccept?: (accepted: boolean) => void
  onResetSubmitSuccess?: () => void
  onUnmount: () => void
}

export const LoginPage = withStyles(styles)(
  class LoginPage extends Component<Props> {
    handleSubmitEmail = (data: FormValues) => {
      const { onSubmitEmail } = this.props

      onSubmitEmail?.(data.input)
    }

    handleSubmitCode = (data: FormValues) => {
      const { onSubmitCode } = this.props

      onSubmitCode?.(data.input)
    }

    handleResendCode = () => {
      const { currentEmail, onSubmitEmail } = this.props
      if (!currentEmail) return

      onSubmitEmail?.(currentEmail)
    }

    handleBackToEmail = () => {
      const { onBackToEmail } = this.props

      onBackToEmail?.()
    }

    handleCancelLogin = () => {
      const { onCancelLogin } = this.props

      onCancelLogin?.()
    }

    handleResetSubmitSuccess = () => {
      const { onResetSubmitSuccess, isSubmitSuccess } = this.props

      isSubmitSuccess && onResetSubmitSuccess?.()
    }

    componentWillUnmount() {
      const { onUnmount } = this.props
      onUnmount()
    }

    render() {
      const { currentStep, acceptedTerms, onToggleAccept, isSubmitting, currentEmail, errorMessage, classes } =
        this.props

      return (
        <div className={classes.page}>
          <div className={classes.contentContainer}>
            <Head title="Login" />
            <div className={classes.content}>
              {currentStep === FormSteps.Email && (
                <>
                  <div className={classes.mb48}>
                    <SvgSecondaryLogoLockup alt="Salad logo" width={208} height={100} />
                  </div>
                  <FieldContainer>
                    <div className={classes.mb48}>
                      <Text variant="baseL">
                        You’re plugged into the world’s easiest and most trusted way to convert your idle computer into
                        sweet rewards!
                      </Text>
                    </div>
                    <div className={classes.mb24}>
                      <Checkbox
                        textElement={
                          <Text variant="baseS">
                            I agree to the{' '}
                            <a
                              className={classes.link}
                              href="https://salad.com/terms-and-conditions"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Terms of Service
                            </a>{' '}
                            and{' '}
                            <a
                              className={classes.link}
                              href="https://salad.com/privacy-policy"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Privacy Policy
                            </a>
                          </Text>
                        }
                        onClick={onToggleAccept}
                        checked={acceptedTerms}
                        dark={true}
                      />
                    </div>
                    <div className={classes.mb48}>
                      <TextField
                        label="Email"
                        disabled={!acceptedTerms}
                        validationRegexErrorMessage={'Invalid email'}
                        serverSideErrorMessage={errorMessage}
                        onSubmit={this.handleSubmitEmail}
                        isSubmitting={isSubmitting}
                        isSubmitSuccess={false}
                        onFocus={this.handleResetSubmitSuccess}
                        validationRegex={
                          // the regex pattern below is the best pattern for recognizing emails(http://emailregex.com/) however, eslint's default settings flags control characters. We know for certain we want to use these control characters so we are ignoring this rule. (https://stackoverflow.com/questions/49743842/javascript-unexpected-control-characters-in-regular-expression)
                          // eslint-disable-next-line no-control-regex
                          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                        }
                        leadingIcon={
                          <SvgIcon size={'large'} stroke="dark">
                            <Mail />
                          </SvgIcon>
                        }
                      />
                    </div>
                    <Text variant="baseXS">
                      Enter your email to create a secure account. Already have an account? Enter the email address
                      you used to sign up.
                    </Text>
                  </FieldContainer>
                </>
              )}
              {currentStep === FormSteps.Code && (
                <>
                  <div className={classnames(classes.header, classes.mb48)}>
                    <Text variant="headline">Enter your One-Time Login Code</Text>
                  </div>
                  <FieldContainer>
                    <div className={classes.mb24}>
                      <Text variant="baseL">A verification code was sent to {currentEmail}.</Text>
                    </div>
                    <div className={classes.mb24}>
                      <span className={classnames(classes.link, classes.mb14)} onClick={this.handleResendCode}>
                        <Text variant="baseL">
                          <u>Send it Again?</u>
                        </Text>
                      </span>
                    </div>
                    <div className={classes.mb48}>
                      <TextField
                        label="Code"
                        validationRegexErrorMessage={'Invalid code format'}
                        serverSideErrorMessage={errorMessage}
                        onSubmit={this.handleSubmitCode}
                        validationRegex={/^\d{4}$/}
                        isSubmitting={isSubmitting}
                        onFocus={this.handleResetSubmitSuccess}
                        autoFocus
                        isSubmitSuccess={false}
                        leadingIcon={
                          <SvgIcon size={'large'} stroke="dark">
                            <Key />
                          </SvgIcon>
                        }
                      />
                    </div>
                    <span onClick={this.handleBackToEmail} className={classnames(classes.link, classes.mb14)}>
                      <Text variant="baseL">
                        <u>Entered the wrong email?</u>
                      </Text>
                    </span>
                  </FieldContainer>
                </>
              )}
            </div>
            <MediaQuery minWidth={767}>
              <img className={classes.rewardImage} src={LoginPageRewards} alt="Salad Reward Items" />
            </MediaQuery>
          </div>
        </div>
      )
    }
  },
)
