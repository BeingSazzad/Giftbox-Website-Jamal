import { Button, Modal } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

interface SuccessModalProps {
  open: boolean
  onViewParticipations: () => void
  onBackHome: () => void
}

export function SuccessModal({
  open,
  onViewParticipations,
  onBackHome,
}: SuccessModalProps) {
  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      centered
      mask={{ closable: false }}
      width={480}
      styles={{
        body: {
          background: 'linear-gradient(180deg, #1f1545 0%, #15103a 100%)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 18,
          padding: '36px 24px 24px',
        },
        mask: {
          background: 'rgba(5, 2, 18, 0.75)',
          backdropFilter: 'blur(4px)',
        },
      }}
    >
      <div className="text-center">
        <div className="w-21 h-21 rounded-full gradient-brand inline-flex items-center justify-center mb-5 shadow-[0_0_60px_rgba(255,137,0,0.55),0_12px_30px_rgba(255,105,0,0.4)]">
          <CheckOutlined style={{ fontSize: 38, color: '#1a0f0a' }} />
        </div>

        <h2 className="m-0 mb-2.5 text-white text-[22px] font-bold">
          Submission Successful!
        </h2>

        <p className="m-0 mb-5 text-white/70 text-[13px] leading-relaxed">
          Your proof of payment has been successfully sent and will be verified
          by our team. If it is approved, you will be added to the list of
          participants.
        </p>

        <div className="bg-deep/60 border border-white/5 rounded-xl px-4 py-3.5 mb-6 italic text-white/65 text-[13px] leading-relaxed">
          All that remains is to wait for the announcement of the winners. If
          you are selected, you will be contacted via{' '}
          <strong className="text-white">WhatsApp</strong> or by{' '}
          <strong className="text-white">Phone call.</strong>
          <br />
          Thank you for your participation.
          <div className="mt-3 text-white not-italic font-bold text-[15px]">
            Good Luck! <span aria-hidden>🍀</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <Button type="primary" block onClick={onViewParticipations}>
            View My Participations
          </Button>
          <Button
            block
            onClick={onBackHome}
            className="bg-transparent! border! border-white/12! text-white! h-12! rounded-xl! font-semibold!"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </Modal>
  )
}
