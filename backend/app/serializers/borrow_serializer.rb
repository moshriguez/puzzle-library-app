class BorrowSerializer < ActiveModel::Serializer
    attributes :id, :check_out_date, :due_date, :active

    attribute :name do
        self.object.puzzle.name
      end
    attribute :img_url do
        self.object.puzzle.img_url
      end
    attribute :pieces_missing do
        self.object.puzzle.pieces_missing
      end
    attribute :num_of_pieces do
        self.object.puzzle.num_of_pieces
      end
     
  end
  