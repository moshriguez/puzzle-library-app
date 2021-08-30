class BorrowSerializer < ActiveModel::Serializer
    attributes :id, :check_out_date, :due_date, :active
    # belongs_to :puzzle

    attribute :puzzle do
        self.object.puzzle
      end
     
  end
  